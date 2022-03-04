using Application.MealMaker.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Authorize]
    public class MealMakerController : ApiBaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MealMakerDto command)
        {
            if(await IsRefreshTokenInvalidAsync())
            {
                return Unauthorized();
            }
            Console.WriteLine(command.Name);
            return Ok();
        }
    }
}
