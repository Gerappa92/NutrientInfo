namespace Infrastructure.Exceptions
{
    public class AzureTableRepositoryException : InfrastructureException
    {
        public AzureTableRepositoryException(string message) : base(message)
        {
        }
    }
}
