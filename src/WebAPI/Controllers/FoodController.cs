using Application.Food;
using Application.Food.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    public class FoodController : ApiBaseController
    {
        [HttpGet]
        public async Task<ActionResult<SearchFoodDto>> SearchFood([FromQuery] SearchFoodQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}
