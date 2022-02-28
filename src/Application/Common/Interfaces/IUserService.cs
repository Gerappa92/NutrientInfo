namespace Application.Common.Interfaces
{
    public interface IUserService
    {
        public Domain.Entities.User GetUser(string id);
    }
}
