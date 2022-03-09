using Application.Common.UsersManagement.Contracts;
using System.Threading.Tasks;

namespace Application.Common.UsersManagement
{
    public interface IUserService
    {
        public Task Register(string userEmail, string password);
        public Task<LoginResponse> Login(string userEmail, string password);
        public Task<RefreshResponse> RefreshCredentials(string userEmail, string refreshToken);
        Task Delete(string userEmail, string password);
        Task ResetPassword(string userEmail, string password, string newPassword);
    }
}
