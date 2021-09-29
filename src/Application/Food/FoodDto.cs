namespace Application.Food
{
    public class FoodDto
    {
        public string BrandName { get; set; }
        public string Description { get; set; }
        public FoodNutrientDto[] Nutrients { get; set; }
    }
}
