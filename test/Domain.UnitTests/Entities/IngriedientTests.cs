using Domain.Entities;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.UnitTests.Entities
{
    [TestFixture]
    public class IngriedientTests
    {
        private Ingriedient _ingriedient;
        private string _potatoId = "1";

        [SetUp]
        public void Setup()
        {
            //_ingriedient = new Ingriedient();
        }

        [Test]
        public void CreateIngriedient_Should_RecalculateNutrientsValues()
        {

        }

        private Ingriedient CreatePotatoIngredient(float amount, string unitName)
        {
            var potato = new Food()
            {
                Id = _potatoId,
                Name = "Potato",
                BrandName = "BrandName",
                BrandOwner = "BrandOwner"
            };

            var ingriedient = new Ingriedient(potato, amount, unitName);
            return ingriedient;
        }
    }
}
