
using Application.User.Commands;
using Application.User.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    public class UserController : ApiBaseController
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserQuery command)
        {
            var token = await Mediator.Send(command);
            return token;
        }
    }
}
