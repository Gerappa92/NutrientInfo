namespace Application.Food.Dto
{
    public class FoodDetailsDto
    {
        public FoodDetailsDto(Domain.Entities.Food food, NutrientItemDailyRecomendationDto[] nutrientItemDailyDto)
        {
            Id = food.Id;
            Name = food.Name;
            BrandOwner = food.BrandOwner;
            BrandName = food.BrandName;
            Nutrients = nutrientItemDailyDto;
            DataSourceName = food.DataSourceName;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string BrandOwner { get; set; }
        public string BrandName { get; set; }
        public NutrientItemDailyRecomendationDto[] Nutrients { get; set; }
        public string DataSourceName { get; set; }
    }
}
