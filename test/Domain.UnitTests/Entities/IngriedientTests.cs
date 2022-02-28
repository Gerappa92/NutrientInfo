using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System.Linq;

namespace Domain.UnitTests.Entities
{
    [TestFixture]
    public class IngriedientTests
    {
        private Ingriedient _ingriedient;
        private string _potatoId = "1";

        [Test]
        [TestCase(100f, 10f, 20f, 10f, 20f)]
        [TestCase(50f, 10f, 20f, 5f, 10f)]
        [TestCase(12.5f, 10f, 20f, 1.25f, 2.5f)]
        [TestCase(200f, 10f, 20f, 20f, 40f)]
        public void CreateIngriedient_Should_RecalculateNutrientsValues(float amount, float sugarValue, float fatValue, float sugarRecalculated, float fatRecalculated)
        {
            var sugarId = "1";
            var fatId = "2";
            var sugar = new NutrientItem()
            {
                Id = sugarId,
                Name = "Sugar",
                Value = sugarValue,
                UnitName = "g"
            };
            var fat = new NutrientItem()
            {
                Id = fatId,
                Name = "Fat",
                Value = fatValue,
                UnitName = "g"
            };

            var potato = new Food()
            {
                Id = _potatoId,
                Name = "Potato",
                BrandName = "BrandName",
                BrandOwner = "BrandOwner"
            };

            potato.Nutrients.Add(sugar);
            potato.Nutrients.Add(fat);

            _ingriedient = new Ingriedient(potato, amount);
            _ingriedient.Nutrients.First(n => n.Id == sugarId).Value.Should().Be(sugarRecalculated);
            _ingriedient.Nutrients.First(n => n.Id == fatId).Value.Should().Be(fatRecalculated);

        }
    }
}
