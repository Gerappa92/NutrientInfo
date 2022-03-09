using Application.Common.UsersManagement;
using Application.Common.UsersManagement.Contracts;
using AutoMapper;
using AzureTableIdentityProvider;
using Domain.Entities;
using Infrastructure.Exceptions;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private const string PARTITION_KEY = "application_user";

        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private ITokenService _tokenService;

        private IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, ITokenService jwtTokenService, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = jwtTokenService;
            _signInManager = signInManager;
            _mapper = new MapperConfiguration(config =>
                {
                    config.CreateMap<User, ApplicationUser>();
                    config.CreateMap<ApplicationUser, User>();
                }).CreateMapper();
        }

        public async Task Register(string userEmail, string password)
        {
            var appUser = new ApplicationUser(userEmail);
            appUser.SetPartitionKey(PARTITION_KEY);
            await CreateUser(password, appUser);
        }

        public async Task<LoginResponse> Login(string userEmail, string password)
        {
            var appUser = await GetUser(userEmail);
            await CheckPassword(appUser, password);
            var refreshToken = _tokenService.GenerateRefreshToken();
            appUser.SetRefreshToken(refreshToken);
            await UpdateUser(appUser);
            var token = _tokenService.GenerateJwtToken(appUser);
            var loginResponse = new LoginResponse(token, refreshToken.Token);
            return loginResponse;
        }

        public async Task<RefreshResponse> RefreshCredentials(string userEmail, string refreshToken)
        {
            var appUser = await GetUser(userEmail);
            var crt = appUser.GetRefreshToken();

            if(crt.IsExpired)
            {
                throw new UserServiceException("Current refresh token expired");
            }
            if(crt.Token != refreshToken)
            {
                throw new UserServiceException("Refresh token is not equal with current refresh token");
            }

            var jwtToken = _tokenService.GenerateJwtToken(appUser);
            var refreshResponse = new RefreshResponse(jwtToken);
            return refreshResponse;
        }

        public async Task ResetPassword(string userEmail, string password, string newPassword)
        {
            var appUser = await GetUser(userEmail);

            var result = await _userManager.ChangePasswordAsync(appUser, password, newPassword);
            if (!result.Succeeded)
            {
                throw new UserServiceException($"Reset password not succesed because of: {result.Errors.Select(e => e.Description)}");
            }
        }

        public async Task Delete(string userEmail, string password)
        {
            var appUser = await GetUser(userEmail);
            await CheckPassword(appUser, password);
            await _userManager.DeleteAsync(appUser);
        }

        private async Task CreateUser(string password, ApplicationUser appUser)
        {
            var result = await _userManager.CreateAsync(appUser, password);
            if (!result.Succeeded)
            {
                throw new UserServiceException($"Register failed. ${string.Join(',', result.Errors.Select(e => e.Description))}");
            }
        }
        private async Task<ApplicationUser> GetUser(string userEmail)
        {
            var appUser = await _userManager.FindByEmailAsync(userEmail);
            if (appUser == null)
            {
                throw new UserServiceException($"User with email: {userEmail} does not exist");
            }
            return appUser;
        }

        private async Task CheckPassword(ApplicationUser appUser, string password)
        {
            var isPasswordCorrent = await _userManager.CheckPasswordAsync(appUser, password);
            if (isPasswordCorrent == false)
            {
                throw new UserServiceException($"Login/password combination is wrong");
            }
        }

        private async Task UpdateUser(ApplicationUser appUser)
        {
            var result = await _userManager.UpdateAsync(appUser);
            if (!result.Succeeded)
            {
                throw new UserServiceException($"Update user not successed because of: {result.Errors.Select(e => e.Description)}");
            }
        }
    }
}
