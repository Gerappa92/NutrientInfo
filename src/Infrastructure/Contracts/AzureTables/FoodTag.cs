namespace Infrastructure.Contracts.AzureTables
{
    public class FoodTag : AzureTable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Mark { get; set; }
        public double MinDailyValuePercentage { get; set; } = 0;
        public double MaxDailyValuePercentage { get; set; } = int.MaxValue;
        public string NutrientId { get; set; }
        public string NutrientName { get; set; }
    }
}
