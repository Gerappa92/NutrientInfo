using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IUserService
    {
        public Domain.Entities.User Get(string id);
        public Task Register(Domain.Entities.User user);
        public Task<string> Login(Domain.Entities.User user);

    }
}
