using Application.Common.Interfaces;
using AutoMapper;
using Azure.Data.Tables;
using Infrastructure.Contracts.AzureTables;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace Infrastructure.Repositories
{
    public class DailyValuesRepository : IDailyValuesRepository
    {
        private readonly TableClient _tableClient;
        private const string _tableName = "DailyValues";
        private readonly IMapper _mapper;

        public DailyValuesRepository(IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            var cs = configuration.GetConnectionString("AzureStorageAccount");
            _tableClient = new TableClient(cs, _tableName);
            
        }

        public Domain.Entities.DailyValues[] GetDailyValues()
        {
            var dailyValues = _tableClient.Query<DailyValues>().ToArray();
            var dailyValuesEntities = _mapper.Map<Domain.Entities.DailyValues[]>(dailyValues);
            return dailyValuesEntities;
        }
    }
}
