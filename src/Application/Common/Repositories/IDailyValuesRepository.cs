using System.Collections.Generic;

namespace Application.Common.Repositories
{
    public interface IDailyValuesRepository
    {
        IEnumerable<Domain.Entities.DailyValue> GetDailyValues();
    }
}
