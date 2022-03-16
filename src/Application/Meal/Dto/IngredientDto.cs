using System.Collections.Generic;

namespace Application.Meal.Dto
{
    public class IngredientDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string BrandOwner { get; set; }
        public string BrandName { get; set; }
        public float Amount { get; set; }
        public List<NutrientDto> Nutrients { get; set; } = new List<NutrientDto>();
    }
}
