namespace Application.Common.UsersManagement.Contracts
{
    public class LoginResponse
    {
        public LoginResponse(string token, string refreshToken)
        {
            Token = token;
            RefreshToken = refreshToken;
        }
        public string Token { get; private set; }
        public string RefreshToken { get; private set; }
    }
}
