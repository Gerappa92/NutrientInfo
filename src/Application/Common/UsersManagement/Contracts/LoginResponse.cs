namespace Application.Common.UsersManagement.Contracts
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
