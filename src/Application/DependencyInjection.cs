using Application.Common.Behaviours;
using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Food;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var executingAssembly = Assembly.GetExecutingAssembly();

            services.AddAutoMapper(typeof(FoodMapping));
            services.AddMediatR(executingAssembly);
            services.AddValidatorsFromAssembly(executingAssembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
            services.AddTransient<IFoodBuilder, FoodBuilder>();

            return services;
        }
    }
}
