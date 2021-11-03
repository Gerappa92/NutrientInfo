namespace Application.Common.Interfaces
{
    public interface IDailyValuesRepository
    {
        Domain.Entities.DailyValues[] GetDailyValues();
    }
}
