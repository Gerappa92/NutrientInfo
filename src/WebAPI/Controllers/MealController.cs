using Application.Meal.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Authorize]
    public class MealController : ApiBaseController
    {
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateMealCommand command)
        {
            command.UserEmail = GetUserEmail();
            await Mediator.Send(command);
            return Ok();
        }
    }
}
