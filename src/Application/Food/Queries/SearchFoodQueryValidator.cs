using FluentValidation;

namespace Application.Food.Queries
{
    public class SearchFoodQueryValidator : AbstractValidator<SearchFoodQuery>
    {
        public SearchFoodQueryValidator()
        {
            RuleFor(x => x.SearchTerm)
                .NotEmpty().WithMessage("SearchTerm is required.");

            RuleFor(x => x.PageNumber)
                .GreaterThanOrEqualTo(1).WithMessage("PageNumber at least greater than or equal to 1.");

            RuleFor(x => x.PageSize)
                .GreaterThanOrEqualTo(1).WithMessage("PageSize at least greater than or equal to 1.");
        }
    }
}
