using System;

namespace Domain.Entities
{
    public class Ingriedient : Food, IEquatable<Ingriedient>
    {
        public float Amount { get; set; }
        public Ingriedient(Food food, float amount)
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

        private void CalcNutrientsValues()
        {
            foreach (var nutrient in Nutrients)
            {
                nutrient.Value = nutrient.Value * (Amount / 100);
            }
        }

        public bool Equals(Ingriedient other)
        {
            return this.Id == other.Id;
        }

        public override int GetHashCode()
        {
            int hash = 17;
            hash = hash * 29 + Id.GetHashCode();
            hash = hash * 29 + Name.GetHashCode();
            hash = hash * 29 + BrandOwner.GetHashCode();
            return hash;
        }
    }
}
