using Application.Food;
using Application.Food.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    public class FoodController : ApiBaseController
    {
        [HttpGet]
        public async Task<ActionResult<SearchFoodDto>> Search([FromQuery] SearchFoodQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("{foodId}")]
        public async Task<ActionResult<FoodDetailsDto>> Get([FromQuery] GetFoodQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}
