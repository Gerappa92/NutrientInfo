using Domain.Entities;
using NUnit.Framework;
using FluentAssertions;


namespace Domain.UnitTests.Entities
{
    [TestFixture]
    public class NutrientItemTests
    {
        NutrientItem _nutritionalItem;

        [SetUp]
        public void SetUp()
        {
            _nutritionalItem = new NutrientItem()
            {
                Id = "1",
                Name = "Protein",
                UnitName = "g",
                Value = 10
            };
        }

        [Test]
        public void Should_Calculate_DailyRecomendationPercentage()
        {
            float recomendedValue = 100;

            _nutritionalItem.CalcDailyValuePercentage(recomendedValue);

            _nutritionalItem.DailyValuePercentage.Should().Be(10);
        }

        [Test]
        public void Should_SetZeroFor_DailyRecomendationPercentage()
        {
            var nutritionalItem = new NutrientItem()
            {
                Id = "1",
                Name = "Protein",
                UnitName = "g",
                Value = 0
            };
            float recomendedValue = 100;

            nutritionalItem.CalcDailyValuePercentage(recomendedValue);

            nutritionalItem.DailyValuePercentage.Should().Be(0);
        }

        [TestCase(0, NutrientItemStatus.Neutral)]
        [TestCase(50, NutrientItemStatus.Good)]
        [TestCase(100, NutrientItemStatus.Warning)]
        [TestCase(100 + 1, NutrientItemStatus.Bad)]
        public void Shoul_SetAppropriateStatus(float value, NutrientItemStatus status)
        {
            var nutritionalItem = new Domain.Entities.NutrientItem()
            {
                Id = "1",
                Name = "Protein",
                UnitName = "g",
                Value = value
            };
            float recomendedValue = 100;

            nutritionalItem.CalcDailyValuePercentage(recomendedValue);

            nutritionalItem.Status.Should().Be(status.ToString());
        }
    }
}
