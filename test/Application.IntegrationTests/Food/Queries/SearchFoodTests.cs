using Application.Common.Interfaces;
using Application.Food.Queries;
using Moq;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace Application.IntegrationTests.Food.Queries
{
    [TestFixture]
    public class SearchFoodTests
    {
        private SearchFoodQueryHandler _searchFoodQueryHandler;

       [Test]
       public async Task ReturnAnyFoods()
        {
            var foodDataServiceMock = new Mock<IFoodDataService>();
            foodDataServiceMock.Setup(s => s.SearchFood(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<bool>()))
                .ReturnsAsync(new Application.Food.Dto.SearchFoodDto()
                {
                    Foods = new Domain.Entities.Food[] {new Domain.Entities.Food() }
                });
            _searchFoodQueryHandler = new SearchFoodQueryHandler(foodDataServiceMock.Object);

            var query = new SearchFoodQuery()
            {
                SearchTerm = "Banana"
            };

            var result = await _searchFoodQueryHandler.Handle(query, new System.Threading.CancellationToken());

            Assert.IsTrue(result.Foods.Any());
        }
    }
}
