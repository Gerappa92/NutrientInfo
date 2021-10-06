using Infrastructure.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Contracts;

namespace WebAPI.Middlewares
{
    public class ApiExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IDictionary<Type, Func<Exception, HttpContext, Task>> _exceptionHandlers;

        public ApiExceptionMiddleware(RequestDelegate next)
        {
            _next = next;

            _exceptionHandlers = new Dictionary<Type, Func<Exception, HttpContext, Task>>
            {
                { typeof(InfrastructureException), HandleInfrastructureException }
            };
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                await HandleException(e, context);
            }
        }

        private async Task HandleException(Exception e, HttpContext context)
        {
            Type type = e.GetType().BaseType;

            if(_exceptionHandlers.ContainsKey(type))
            {
                await _exceptionHandlers[type](e, context);
                return;
            }

            await HandleUnknowExceptionAsync (e, context);
        }

        private async Task HandleInfrastructureException(Exception exception, HttpContext context)
        {
            var infrastructureException = exception as InfrastructureException;
            var errorResponse = new ErrorResponse(infrastructureException);
            var errorResponseJson = errorResponse.ToJson();

            await SetResponse(context, errorResponseJson, StatusCodes.Status500InternalServerError);
        }

        private async Task HandleUnknowExceptionAsync(Exception e, HttpContext context)
        {
            var errorResponse = new ErrorResponse(e);
            errorResponse.SetMessage("Unknown exception occured.");
            var errorResponseJson = errorResponse.ToJson();

            await SetResponse(context, errorResponseJson, StatusCodes.Status500InternalServerError);
        }

        private async Task SetResponse(HttpContext context, string errorResponseJson, int statusCode)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsync(errorResponseJson);
        }
    }

    public static class ApiExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseApiException(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ApiExceptionMiddleware>();
        }
    }
}
