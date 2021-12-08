using System.Collections.Generic;

namespace Application.Common.Interfaces
{
    public interface IDailyValuesRepository
    {
        IEnumerable<Domain.Entities.DailyValue> GetDailyValues();
    }
}
