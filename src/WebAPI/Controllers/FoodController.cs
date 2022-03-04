using Application.Food.Dto;
using Application.Food.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    public class FoodController : ApiBaseController
    {
        [HttpGet]
        public async Task<ActionResult<FilteredFoodListDto>> Search([FromQuery] SearchFoodQuery query)
        {
            var refreshtoken = Request.Cookies["refreshToken"];
            return await Mediator.Send(query);
        }

        [HttpGet("{foodId}")]
        public async Task<ActionResult<FoodDto>> Get(string foodId)
        {
            GetFoodQuery query = new GetFoodQuery() { Id = foodId };
            return await Mediator.Send(query);
        }
    }
}
