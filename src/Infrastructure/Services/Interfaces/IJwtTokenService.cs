using AzureTableIdentityProvider;

namespace Infrastructure.Services.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(ApplicationUser user);
    }
}
