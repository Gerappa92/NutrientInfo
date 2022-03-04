using Application.MealMaker.Dto;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MealMakerController : ApiBaseController
    {
        [HttpPost]
        public IActionResult Create([FromBody] MealMakerDto command)
        {
            var refreshtoken = Request.Cookies["refreshToken"];
            Console.WriteLine(command.Name);
            return Ok();
        }
    }
}
