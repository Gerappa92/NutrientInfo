using Microsoft.AspNetCore.Cors.Infrastructure;
using System;

namespace WebAPI.Configurations
{
    public static class Policies
    {
        public static string ALLOW_ALL_CORS_POLICY = "AllowAll";
        public static string DEV_CORS_POLICY = "Dev";

        public static void AllowAll(CorsOptions options)
        {
            options.AddPolicy(ALLOW_ALL_CORS_POLICY, policy => policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
        }

        public static void Dev(CorsOptions options)
        {
            options.AddPolicy(DEV_CORS_POLICY, policy => policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
        }
    }
}