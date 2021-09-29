namespace Infrastructure.Exceptions
{
    public class FoodDataCentralApiRequestException : InfrastructureException
    {
        public FoodDataCentralApiRequestException(string message) : base(message)
        {
        }
    }
}
