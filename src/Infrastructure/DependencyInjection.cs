﻿using Application.Common.Interfaces;
using Infrastructure.Mappings;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(FoodMapping), typeof(AzureTablesMapping));
            services.AddTransient<IFoodDataService, FoodDataCentralService>();
            services.AddTransient<IDailyValuesRepository, DailyValuesRepository>();
            services.AddTransient<IFoodTagsRepository, FoodTagsRepository>();
            services.AddTransient(typeof(IAzureTableRepository<>),typeof(AzureTableRepository<>));
            return services;
        }
    }
}
