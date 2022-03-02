using Application.Common.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Queries
{
    public class LoginUserQuery : IRequest<string>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginUserCommandHandler : IRequestHandler<LoginUserQuery, string>
    {
        private IUserService _userService;

        public LoginUserCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<string> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var user = new Domain.Entities.User(request.Email, request.Name, request.Password);
            var token = await _userService.Login(user);
            return token;
        }
    }
}
