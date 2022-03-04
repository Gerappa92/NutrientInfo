using Application.Common.UsersManagement;
using Application.Common.UsersManagement.Contracts;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands
{
    public class RefreshCredentialsCommand : IRequest<LoginResponse>
    {
        public string UserEmail { get; set; }
        public string RefreshToken { get; set; }
    }

    public class RefreshCredentialsCommandHandler : IRequestHandler<RefreshCredentialsCommand, LoginResponse>
    {
        private readonly IUserService _userService;

        public RefreshCredentialsCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<LoginResponse> Handle(RefreshCredentialsCommand request, CancellationToken cancellationToken)
        {
            var tokens = await _userService.RefreshCredentials(request.UserEmail, request.RefreshToken);
            return tokens;
        }
    }
}
