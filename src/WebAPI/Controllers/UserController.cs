using Application.User.Commands;
using Application.User.Queries;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAPI.Contracts;
using WebAPI.Contracts.Requests.User;

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

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<ActionResult<LoginResponse>> Refresh([FromBody] RefreshTokenRequest request)
        {
            var command = new RefreshCredentialsCommand { RefreshToken = GetRefreshTokenCookie(), UserEmail = request.Email };
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
            if(GetUserEmail() != command.Email)
            {
                return Unauthorized();
            }
            await Mediator.Send(command);
            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetUserPasswordCommand command)
        {
            if (GetUserEmail() != command.Email)
            {
                return Unauthorized();
            }
            await Mediator.Send(command);
            return Ok();
        }

        [HttpGet("current")]
        public ActionResult<Domain.Entities.User> GetCurrent()
        {
            var userEmail = GetUserEmail();
            if(userEmail.IsEmpty())
            {
                return Unauthorized();
            }
            var currentUser = new Domain.Entities.User { Email = userEmail, IsAuthenticated= true };
            return Ok(currentUser);
        }
    }
}