using AzureTableIdentityProvider;

namespace Infrastructure.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(ApplicationUser user);
        RefreshToken GenerateRefreshToken();
    }
}
