namespace Infrastructure.Exceptions
{
    public class WrongConfigurationException : InfrastructureException
    {
        public WrongConfigurationException(string message) : base(message)
        {
        }
    }
}
