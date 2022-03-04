using Application.User.Commands;
using Application.User.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAPI.Contracts;

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
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginUserQuery command)
        {
            var tokens = await Mediator.Send(command);
            SetRefreshTokenCookie(tokens.RefreshToken);
            return new LoginResponse(tokens.Token);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<LoginResponse>> Refresh([FromBody] RefreshCredentialsCommand command)
        {
            var tokens = await Mediator.Send(command);
            SetRefreshTokenCookie(tokens.RefreshToken);
            return new LoginResponse(tokens.Token);
        }
    }
}
