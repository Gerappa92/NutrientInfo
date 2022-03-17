using Application.Common.Interfaces;
using Domain.Entities;
using Infrastructure.Services;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.UnitTests.Services
{
    [TestFixture]
    public class MealCalculatorTests
    {
        private IMealCalculator _mealCalculator;

        [SetUp]
        public void SetUp()
        {
            _mealCalculator = new MealCalculator();
        }

        [Test]
        public void CalculateNutrients_GroupNutrientsById()
        {
            var nutrient1Id = "1";
            var nutrient2Id = "2";

            var ingredient_1 = FakeIngredient(
                1,
                100,
                FakeNutrient(nutrient1Id, 10),
                FakeNutrient(nutrient2Id, 20));

            var ingredient_2 = FakeIngredient(
                1,
                50,
                FakeNutrient(nutrient1Id, 10),
                FakeNutrient(nutrient2Id, 20));

            var ingredients = new List<Ingredient> { ingredient_1, ingredient_2 };
            //Act
            var nutrients = _mealCalculator.CalculateNutrients(ingredients);
            //Assert
            Assert.AreEqual(2, nutrients.Count());
            Assert.IsTrue(nutrients.SingleOrDefault(n => n.Id == nutrient1Id) != null);
            Assert.IsTrue(nutrients.Single(n => n.Id == nutrient2Id) != null);
        }

        [Test]
        public void CalculateNutrients_SumNutrientsValuesById()
        {
            var nutrient1Id = "1";
            var nutrient2Id = "2";

            var ingredient_1 = FakeIngredient(
                1,
                100,
                FakeNutrient(nutrient1Id, 10),
                FakeNutrient(nutrient2Id, 20));

            var ingredient_2 = FakeIngredient(
                1,
                50,
                FakeNutrient(nutrient1Id, 10),
                FakeNutrient(nutrient2Id, 20));

            var ingredients = new List<Ingredient> { ingredient_1, ingredient_2 };
            //Act
            var nutrients = _mealCalculator.CalculateNutrients(ingredients);
            //Assert
            Assert.AreEqual(15, nutrients.SingleOrDefault(n => n.Id == nutrient1Id).Value);
            Assert.AreEqual(30, nutrients.Single(n => n.Id == nutrient2Id).Value);
        }

        private NutrientItem FakeNutrient(string id, float value)
        {
            return new NutrientItem()
            {
                Id = id,
                Name = $"nutrient_{id}",
                Value = value
            };
        }

        private Ingredient FakeIngredient(int id, float value, params NutrientItem[] nutrients)
        {
            var food_1 = new Domain.Entities.Food()
            {
                Id = $"f_{id}",
                Name = $"food_{id}",
                Nutrients = nutrients.ToList()
            };

            return new Ingredient(food_1, value);
        }
    }
}
