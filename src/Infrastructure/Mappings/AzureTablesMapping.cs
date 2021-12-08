using AutoMapper;
using Infrastructure.Contracts.AzureTables;

namespace Infrastructure.Mappings
{
    public class AzureTablesMapping : Profile
    {
        public AzureTablesMapping()
        {
            CreateMap<DailyValues, Domain.Entities.DailyValue>();
            CreateMap<FoodTag, Domain.Entities.FoodTag>();
        }
    }
}
