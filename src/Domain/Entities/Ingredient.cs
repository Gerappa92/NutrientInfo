using System;

namespace Domain.Entities
{
    public class Ingredient : Food, IEquatable<Ingredient>
    {
        public Ingredient() { }
        public Ingredient(Food food, float amount)
        {
            Id = food.Id;
            Name = food.Name;
            BrandOwner = food.BrandOwner;
            BrandName = food.BrandName;
            Nutrients = food.Nutrients;
            DataSourceName = food.DataSourceName;
            FoodTags = food.FoodTags;
            Amount = amount;
            CalcNutrientsValues();
        }
        public float Amount { get; set; }

        private void CalcNutrientsValues()
        {
            foreach (var nutrient in Nutrients)
            {
                nutrient.Value = nutrient.Value * (Amount / 100);
            }
        }

        public bool Equals(Ingredient other)
        {
            return this.Id == other.Id;
        }

        public override int GetHashCode()
        {
            int hash = 17;
            hash = hash * 29 + Id.GetHashCode();
            hash = hash * 29 + Name.GetHashCode();
            return hash;
        }
    }
}
