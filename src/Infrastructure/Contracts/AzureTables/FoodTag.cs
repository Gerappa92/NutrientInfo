namespace Infrastructure.Contracts.AzureTables
{
    public class FoodTag : AzureTable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Mark { get; set; }
        public float MinDailyValuePercentage { get; set; } = 0;
        public float MaxDailyValuePercentage { get; set; } = float.MaxValue;
        public string NutrientId { get; set; }
        public string NutrientName { get; set; }
    }
}
