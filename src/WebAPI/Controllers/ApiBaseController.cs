using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiBaseController : ControllerBase
    {
        private ISender _mediator;
        private const string REFRESH_TOKEN_COOKIE = "refreshToken";

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetService<ISender>();

        protected void SetRefreshTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(1),
                SameSite = SameSiteMode.None,
                Secure = true
            };
            Response.Cookies.Append(REFRESH_TOKEN_COOKIE, token, cookieOptions);
        }

        protected string GetRefreshTokenCookie()
        {
            var refreshToken = HttpContext.Request.Cookies[REFRESH_TOKEN_COOKIE];
            return refreshToken == null ? string.Empty : refreshToken;
        }

        protected string GetUserEmail()
        {
            var userEmailClaim = HttpContext.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.Email);
            return userEmailClaim == null ? string.Empty : userEmailClaim.Value;
        }
    }
}
