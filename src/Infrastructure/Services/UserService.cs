using Application.Common.Interfaces;
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
        private IJwtTokenService _jwtTokenService;

        private IMapper _mapper;


        public UserService(UserManager<ApplicationUser> userManager, IJwtTokenService jwtTokenService, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _mapper = new MapperConfiguration(config =>
                {
                    config.CreateMap<User, ApplicationUser>();
                    config.CreateMap<ApplicationUser, User>();
                }).CreateMapper();
            _jwtTokenService = jwtTokenService;
            _signInManager = signInManager;
        }

        public User Get(string id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<string> Login(User user)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(user.Email, user.Password, isPersistent: false, lockoutOnFailure: false);

            if(!signInResult.Succeeded)
            {
                throw new UserServiceException($"Login/password combination is wrong");
            }

            var appUser = Map(user);
            var token = _jwtTokenService.GenerateToken(appUser);
            return token;
        }

        public async Task Register(User user)
        {
            var appUser = Map(user);

            var result = await _userManager.CreateAsync(appUser, user.Password);
            if(!result.Succeeded)
            {
                throw new UserServiceException($"Register failed. ${string.Join(',', result.Errors.Select(e => e.Description))}");
            }
        }

        private ApplicationUser Map(User user)
        {
            var appUser = _mapper.Map<ApplicationUser>(user);
            appUser.PartitionKey = _partitionKey;
            appUser.RowKey = appUser.Id;
            return appUser;
        }
    }
}
