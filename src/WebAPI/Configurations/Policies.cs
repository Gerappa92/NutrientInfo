using Microsoft.AspNetCore.Cors.Infrastructure;

namespace WebAPI.Configurations
{
    public static class Policies
    {
        public static string ALLOW_ALL_CORS_POLICY = "AllowAll";

        public static void AllowAll(CorsOptions options)
        {
            options.AddPolicy(ALLOW_ALL_CORS_POLICY, policy => policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
        }
    }
}