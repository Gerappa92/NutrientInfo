namespace Infrastructure.Exceptions
{
    public class UserServiceException : InfrastructureException
    {
        public UserServiceException(string message) : base(message)
        {
        }
    }
}
