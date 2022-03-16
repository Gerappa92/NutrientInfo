using Application.Common.UsersManagement;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using static Application.Common.Consts.RegexPatterns;


namespace Application.User.Commands
{
    public class RegisterUserCommand : IRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand>
    {
        private readonly IUserService _userManager;

        public RegisterUserCommandHandler(IUserService userManager)
        {
            _userManager = userManager;
        }

        public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            await _userManager.Register(request.Email, request.Password);
            return Unit.Value;
        }
    }

    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserCommandValidator()
        {
            RuleFor(p => p.Email).NotEmpty().EmailAddress();
            RuleFor(p => p.Password).NotEmpty().Matches(PASSWORD_PATTERN);
        }
    }
}
