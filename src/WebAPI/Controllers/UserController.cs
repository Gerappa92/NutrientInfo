
using Application.Common.UsersManagement.Contracts;
using Application.User.Commands;
using Application.User.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginUserQuery command)
        {
            var token = await Mediator.Send(command);
            SetRefreshTokenCookie(token.RefreshToken);
            return token;
        }

        private void SetRefreshTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(1),
                SameSite=SameSiteMode.None,
                Secure=true
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}
