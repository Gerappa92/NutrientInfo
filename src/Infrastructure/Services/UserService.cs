using Application.Common.Interfaces;
using AutoMapper;
using AzureTableIdentityProvider;
using Domain.Entities;
using Infrastructure.Exceptions;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private const string _partitionKey = "application_user";

        private UserManager<ApplicationUser> _userManager;
        private IMapper _mapper;


        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = new MapperConfiguration(config =>
                {
                    config.CreateMap<User, ApplicationUser>();
                    config.CreateMap<ApplicationUser, User>();
                }).CreateMapper();
        }

        public User Get(string id)
        {
            
        }

        public async Task Register(User user)
        {
            var appUser = _mapper.Map<ApplicationUser>(user);
            appUser.PartitionKey = _partitionKey;
            appUser.RowKey = appUser.Id;

            var result = await _userManager.CreateAsync(appUser, user.Password);
            if(!result.Succeeded)
            {
                throw new UserServiceException($"Register failed. ${string.Join(',', result.Errors)}");
            }
        }
    }
}
