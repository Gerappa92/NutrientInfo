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

            _nutritionalItem.DailyValuePercentage.Should().Be(0.1f);
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
        [TestCase(0.5f, NutrientItemStatus.Good)]
        [TestCase(1, NutrientItemStatus.Warning)]
        [TestCase(1 + 1, NutrientItemStatus.Bad)]
        public void Shoul_SetAppropriateStatus(float value, NutrientItemStatus status)
        {
            var nutritionalItem = new Domain.Entities.NutrientItem()
            {
                Id = "1",
                Name = "Protein",
                UnitName = "g",
                Value = value * 100
            };
            float recomendedValue = 100;

            nutritionalItem.CalcDailyValuePercentage(recomendedValue);

            nutritionalItem.Status.Should().Be(status.ToString());
        }
    }
}
