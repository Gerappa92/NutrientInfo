using Application.Common.UsersManagement;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using static Application.Common.Consts.RegexPatterns;


namespace Application.User.Commands
{
    public class DeleteUserAccountCommand : IRequest
    {
        public string Email { get; set; }
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
            await _userService.Delete(request.Email, request.Password);
            return Unit.Value;
        }
    }

    public class DeleteUserAccountCommandValidator : AbstractValidator<DeleteUserAccountCommand>
    {
        public DeleteUserAccountCommandValidator()
        {
            RuleFor(p => p.Email).NotEmpty().EmailAddress();
            RuleFor(p => p.Password).NotEmpty().Matches(PASSWORD_PATTERN);
        }
    }
}
