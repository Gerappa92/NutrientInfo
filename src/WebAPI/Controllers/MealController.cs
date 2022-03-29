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

        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> Get(string id)
        {
            var query= new GetMealQuery { Id = id };
            var meal = await Mediator.Send(query);
            if(meal is null)
            {
                return NotFound();
            }
            return Ok(meal);
        }

        [HttpGet("user")]
        public async Task<ActionResult<Meal[]>> GetUsersMeals()
        {
            var userEmail = GetUserEmail();
            var query = new GetUsersMealsQuery { UserEmail = userEmail };
            var meals = await Mediator.Send(query);
            return Ok(meals);
        }

        [HttpPost("update")]
        public async Task<ActionResult> Update([FromBody] UpdateMealCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var command = new DeleteMealCommand { Id = id };
            await Mediator.Send(command);
            return Ok();
        }
    }
}
