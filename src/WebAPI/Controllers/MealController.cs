using Application.Meal.Commands;
using Application.Meal.Query;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpPost("calculate-nutrients")]
        public async Task<ActionResult<IEnumerable<NutrientItem>>> CalculateNutrients([FromBody] GetMealNutrientsQuery query)
        {
            var nutrients = await Mediator.Send(query);
            return Ok(nutrients);
        }
    }
}
