namespace WebAPI.Contracts
{
    public class LoginResponse
    {
        public LoginResponse(string jwtToken)
        {
            Token = jwtToken;
        }
        public string Token { get; set; }
    }
}
