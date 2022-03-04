using Application.Common.UsersManagement;
using Infrastructure.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiBaseController : ControllerBase
    {
        private ISender _mediator;
        private IUserService _userService;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();
        protected IUserService UserService => _userService ??= HttpContext.RequestServices.GetService<IUserService>();

        protected void SetRefreshTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(1),
                SameSite = SameSiteMode.None,
                Secure = true
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        protected async Task<bool> IsRefreshTokenInvalidAsync()
        {
            var refreshToken = GetRefreshToken();
            var userEmail = GetUserEmail();
            if (userEmail.IsEmpty() || refreshToken.IsEmpty())
            {
                return true;
            }
            var isValid = await UserService.IsRefreshTokenValid(userEmail, refreshToken);
            return !isValid;
        }

        protected string GetUserEmail() => HttpContext.User.Claims.Single(c => c.Type == ClaimTypes.Email).Value;

        private string GetRefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            return refreshToken.IsEmpty() ? string.Empty : refreshToken;
        }
    }
}
