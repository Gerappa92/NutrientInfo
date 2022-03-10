using Application.User.Commands;
using Application.User.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAPI.Contracts;

namespace WebAPI.Controllers
{
    [Authorize]
    public class UserController : ApiBaseController
    {
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginUserQuery command)
        {
            var tokens = await Mediator.Send(command);
            SetRefreshTokenCookie(tokens.RefreshToken);
            return new LoginResponse(tokens.Token);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<LoginResponse>> Refresh()
        {
            var command = new RefreshCredentialsCommand { RefreshToken = GetRefreshTokenCookie(), UserEmail = GetUserEmail() };
            var tokens = await Mediator.Send(command);
            return new LoginResponse(tokens.Token);
        }

        [HttpPost("is-authenticated")]
        public IActionResult IsAuthenticated()
        {
            return Ok();
        }

        [HttpPost("delete-account")]
        public async Task<IActionResult> Delete([FromBody] DeleteUserAccountCommand command)
        {
            command.UserEmail = GetUserEmail();
            await Mediator.Send(command);
            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetUserPasswordCommand command)
        {
            command.UserEmail = GetUserEmail();
            await Mediator.Send(command);
            return Ok();
        }
    }
}