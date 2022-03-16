using System.Collections.Generic;

namespace Application.Food.Dto
{
    public class FoodDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string BrandOwner { get; set; }
        public string BrandName { get; set; }
        public List<NutrientItemDto> Nutrients { get; set; } = new List<NutrientItemDto>();
        public string DataSourceName { get; set; }
        public List<FoodTagDto> FoodTags { get; private set; } = new List<FoodTagDto>();

    }

    public class FoodTagDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Mark { get; set; }
        public float MinDailyValuePercentage { get; set; } = 0;
        public float MaxDailyValuePercentage { get; set; } = float.MaxValue;
        public string NutrientId { get; set; }
        public string NutrientName { get; set; }
    }

    public class NutrientItemDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public string UnitName { get; set; } = string.Empty;
        public float DailyValuePercentage { get; private set; }
        public string Status { get; private set; } = "Neutral";
    }
}
