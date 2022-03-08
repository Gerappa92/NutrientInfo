namespace Application.Common.UsersManagement.Contracts
{
    public class RefreshResponse
    {
        public RefreshResponse(string token)
        {
            Token = token;
        }
        public string Token { get; set; }
    }
}
