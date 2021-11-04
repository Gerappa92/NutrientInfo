namespace Infrastructure.Contracts.AzureTables
{
    public class DailyValues : AzureTable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string UnitName { get; set; }
        public double Value { get; set; }
    }
}
