using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using MediatR;

namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            var callingAssembly = Assembly.GetCallingAssembly();
            var executingAssembly = Assembly.GetExecutingAssembly();
            services.AddAutoMapper(callingAssembly);
            services.AddMediatR(executingAssembly);

            return services;
        }
    }
}
