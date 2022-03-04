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
        private const string _partitionKey = "application_user";

        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private ITokenService _tokenService;

        private IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, ITokenService jwtTokenService, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _mapper = new MapperConfiguration(config =>
                {
                    config.CreateMap<User, ApplicationUser>();
                    config.CreateMap<ApplicationUser, User>();
                }).CreateMapper();
            _tokenService = jwtTokenService;
            _signInManager = signInManager;
        }

        public async Task Register(User user)
        {
            var appUser = Map(user);

            var result = await _userManager.CreateAsync(appUser, user.Password);
            if (!result.Succeeded)
            {
                throw new UserServiceException($"Register failed. ${string.Join(',', result.Errors.Select(e => e.Description))}");
            }
        }

        public async Task<LoginResponse> Login(User user)
        {
            await SignInUser(user);

            var appUser = await GetUser(user.Email);
            var refreshToken = _tokenService.GenerateRefreshToken();

            await SetUserRefreshToken(appUser, refreshToken);

            var token = _tokenService.GenerateJwtToken(appUser);

            return new LoginResponse(token, refreshToken.Token);
        }

        public async Task<LoginResponse> RefreshCredentials(string userEmail, string refreshToken)
        {
            var appUser = await GetUser(userEmail);

            if(appUser == null)
            {
                throw new UserServiceException($"User with email {userEmail} does not exist");
            }

            var crt = appUser.GetRefreshToken();

            if(crt.IsExpired)
            {
                throw new UserServiceException("Current refresh token expired");
            }
            if(crt.Token != refreshToken)
            {
                throw new UserServiceException("Refresh token is not equal with current refresh token");
            }

            var newRefreshToken = _tokenService.GenerateRefreshToken();
            appUser.SetRefreshToken(newRefreshToken);
            await _userManager.UpdateAsync(appUser);

            var jwtToken = _tokenService.GenerateJwtToken(appUser);
            return new LoginResponse(jwtToken, newRefreshToken.Token);
        }

        public async Task<bool> IsRefreshTokenValid(string userEmail, string refreshToken)
        {
            var appUser = await GetUser(userEmail);
            if (appUser == null)
            {
                throw new UserServiceException($"User with email {userEmail} does not exist");
            }
            
            var crt = appUser.GetRefreshToken();

            return crt.IsActive && crt.Token == refreshToken;
        }

        private async Task<ApplicationUser> GetUser(string email) => await _userManager.FindByEmailAsync(email);

        private ApplicationUser Map(User user)
        {
            var appUser = _mapper.Map<ApplicationUser>(user);
            appUser.PartitionKey = _partitionKey;
            appUser.RowKey = appUser.Id;
            return appUser;
        }
        
        private async Task SignInUser(User user)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(user.Email, user.Password, isPersistent: false, lockoutOnFailure: false);
            if (!signInResult.Succeeded)
            {
                throw new UserServiceException($"Login/password combination is wrong");
            }
        }

        private async Task SetUserRefreshToken(ApplicationUser appUser, RefreshToken refreshToken)
        {
            appUser.SetRefreshToken(refreshToken);
            await _userManager.UpdateAsync(appUser);
        }
    }
}
