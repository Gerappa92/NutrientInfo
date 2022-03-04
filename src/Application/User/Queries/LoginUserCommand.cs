using Application.Common.UsersManagement;
using Application.Common.UsersManagement.Contracts;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Queries
{
    public class LoginUserQuery : IRequest<LoginResponse>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginUserCommandHandler : IRequestHandler<LoginUserQuery, LoginResponse>
    {
        private IUserService _userService;

        public LoginUserCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<LoginResponse> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var user = new Domain.Entities.User(request.Email, request.Password);
            var token = await _userService.Login(user);
            return token;
        }
    }
}
