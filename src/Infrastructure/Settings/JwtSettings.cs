namespace Infrastructure.Settings
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public int JwtTokenLifetime { get; set; }
        public int RefreshTokenLifetime { get; set; }
    }
}
