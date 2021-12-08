using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.UnitTests.Entities
{
    [TestFixture]
    public class FoodTests
    {
        [Test]
        public void Filter_Should_ReturnLowSugarTag()
        {
            var nutrients = new List<NutrientItem> { GetNutrientItem(1, 100) };
            var food = new Food() { Nutrients = nutrients };

            food.SetFoodTags(_foodTags);

            food.FoodTags.Should().HaveCount(1);
            food.FoodTags.First().Should().BeEquivalentTo(_foodTags[0]);
        }

        [Test]
        public void Filter_Should_ReturnHighSugarTag()
        {
            var nutrients = new List<NutrientItem> { GetNutrientItem(101, 100) };
            var food = new Food() { Nutrients = nutrients };

            food.SetFoodTags(_foodTags);

            food.FoodTags.Should().HaveCount(1);
            food.FoodTags.First().Should().BeEquivalentTo(_foodTags[1]);
        }

        [Test]
        public void Filter_Should_NotReturnTag()
        {
            var nutrients = new List<NutrientItem> { GetNutrientItem(10, 100) };
            var food = new Food() { Nutrients = nutrients };

            food.SetFoodTags(_foodTags);

            food.FoodTags.Should().HaveCount(0);
        }

        private FoodTag[] _foodTags = new FoodTag[]
            {
                new FoodTag()
                {
                    Id = "1",
                    Mark = "Positive",
                    MaxDailyValuePercentage = 1f,
                    Name = "Low Sugar",
                    NutrientId = "269",
                    NutrientName = "Sugar"
                },
                new FoodTag()
                {
                    Id = "1",
                    Mark = "Negative",
                    MinDailyValuePercentage = 100,
                    Name = "High Sugar",
                    NutrientId = "269",
                    NutrientName = "Sugar"
                }
            };

        private Domain.Entities.NutrientItem GetNutrientItem(float value, float recommendedValue)
        {
            Domain.Entities.NutrientItem nutrientItem = new Domain.Entities.NutrientItem()
            {
                Id = "269",
                Name = "Sugar",
                Value = value,
                UnitName = "g",
            };
            nutrientItem.CalcDailyValuePercentage(recommendedValue);
            return nutrientItem;
        }
    }
}
