using Application.Common.Interfaces;
using Application.Common.Repositories;
using Application.Common.UsersManagement;
using AzureTableIdentityProvider;
using AzureTableIdentityProvider.DataAccessLayer;
using Infrastructure.Mappings;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Interfaces;
using Infrastructure.Services;
using Infrastructure.Services.Interfaces;
using Infrastructure.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
            services.AddTransient(typeof(IAzureTableRepository<>), typeof(AzureTableRepository<>));

            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITokenService, TokenService>();
            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            string secret = configuration.GetValue<string>("JwtSettings:Secret");

            services.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(config =>
            {
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)),
                    ValidateIssuer = false,
                    RequireExpirationTime = false,
                    ValidateLifetime = true,
                    ValidateAudience = false
                };
            });
            return services;
        }

        public static IServiceCollection AddAzureTableIdentityProvider(this IServiceCollection services, IConfiguration configuration)
        {
            var azureTableCS = configuration.GetConnectionString("AzureStorageAccount");
            services.AddSingleton<AzureTableConnection>(f => new AzureTableConnection(azureTableCS));

            services.AddTransient<IUserStore<ApplicationUser>, AzureTableUserStore>();
            services.AddTransient<IRoleStore<ApplicationRole>, AzureTableRoleStore>();

            services.AddIdentity<ApplicationUser, ApplicationRole>().AddDefaultTokenProviders();
            return services;
        }

        public static IServiceCollection AddSettings(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = new JwtSettings();
            configuration.Bind(nameof(JwtSettings), jwtSettings);
            services.AddSingleton(jwtSettings);

            return services;
        }

        public static IServiceCollection AddAthorizations(this IServiceCollection services)
        {
            services.AddAuthorization(config => config.AddPolicy("NI-Policy", pc => pc.RequireAuthenticatedUser()));
            return services;
        }
    }
}
