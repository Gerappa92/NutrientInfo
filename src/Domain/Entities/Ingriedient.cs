namespace Domain.Entities
{
    public class Ingriedient : Food
    {
        public float Amount { get; set; }
        public string UnitName { get; set; }
        public Ingriedient(Food food, float amount, string unitName)
        {
            Id = food.Id;
            Name = food.Name;
            BrandOwner = food.BrandOwner;
            BrandName = food.BrandName;
            Nutrients = food.Nutrients;
            DataSourceName = food.DataSourceName;
            FoodTags = food.FoodTags;
            Amount = amount;
            UnitName = unitName;
            CalcNutrientsValues();
        }

        private void CalcNutrientsValues()
        {
            foreach (var nutrient in Nutrients)
            {
                nutrient.Value = nutrient.Value * (Amount / 100);
            }
        }
    }
}
