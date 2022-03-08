using Application.Common.UsersManagement.Contracts;
using System.Threading.Tasks;

namespace Application.Common.UsersManagement
{
    public interface IUserService
    {
        public Task Register(Domain.Entities.User user);
        public Task<LoginResponse> Login(Domain.Entities.User user);
        public Task<RefreshResponse> RefreshCredentials(string userEmail, string refreshToken);
        public Task<bool> IsRefreshTokenValid(string userEmail, string refreshToken);
    }
}
