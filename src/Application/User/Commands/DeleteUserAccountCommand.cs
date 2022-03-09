using Application.Common.UsersManagement;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands
{
    public class DeleteUserAccountCommand : IRequest
    {
        public string UserEmail { get; set; }
        public string Password { get; set; }
    }

    public class DeleteUserAccountCommandHandler : IRequestHandler<DeleteUserAccountCommand>
    {
        private readonly IUserService _userService;

        public DeleteUserAccountCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<Unit> Handle(DeleteUserAccountCommand request, CancellationToken cancellationToken)
        {
            await _userService.Delete(request.UserEmail, request.Password);
            return Unit.Value;
        }
    }
}
