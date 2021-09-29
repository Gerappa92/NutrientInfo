using AutoMapper;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.IntegrationTests.Services
{

    [TestFixture]
    public class FoodDataCentralServiceTests
    {
        private FoodDataCentralService _foodDataCentralService;
        

        [SetUp]
        public void SetUp()
        {
            IConfiguration configuration = Environment.GetService<IConfiguration>();
            IMapper mapper = Environment.GetService<IMapper>();
            _foodDataCentralService = new FoodDataCentralService(configuration, mapper);
        }

        [Test]
        public async Task SearchFood_ReturnAnyFoods()
        {
            var searchResultDto =  await _foodDataCentralService.SearchFood("Banana");

            Assert.IsTrue(searchResultDto.Foods.Any());
        }
    }
}
