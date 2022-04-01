using System.Collections.Generic;

namespace Application.Common.Interfaces
{
    public interface IMealCalculator
    {
        IEnumerable<Domain.Entities.NutrientItem> CalculateNutrients(IEnumerable<Domain.Entities.Ingredient> ingredients);
    }
}
