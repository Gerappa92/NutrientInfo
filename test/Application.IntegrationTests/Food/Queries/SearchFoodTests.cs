using Application.Food.Queries;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Application.IntegrationTests.Environment;

namespace Application.IntegrationTests.Food.Queries
{
    [TestFixture]
    public class SearchFoodTests
    {

       [Test]
       public async Task ReturnAnyFoods()
        {
            var query = new SearchFoodQuery()
            {
                SearchTerm = "Banana"
            };

            var result = await SendAsync(query);

            Assert.IsTrue(result.Foods.Any());
        }
    }
}
