using Application.Common.Repositories;
using AutoMapper;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;

namespace Infrastructure.Repositories
{
    public class DailyValuesRepository : IDailyValuesRepository
    {
        private IAzureTableRepository<DailyValues> _tableRepository;
        private const string _tableName = "DailyValues";
        private readonly IMapper _mapper;

        public DailyValuesRepository(IAzureTableRepository<DailyValues> tableRepository, IMapper mapper)
        {
            _mapper = mapper;
            _tableRepository = tableRepository;
            _tableRepository.CreateTableClient(_tableName);
        }

        public IEnumerable<Domain.Entities.DailyValue> GetDailyValues()
        {
            var dailyValues = _tableRepository.GetAll();
            var dailyValuesEntities = _mapper.Map<Domain.Entities.DailyValue[]>(dailyValues);
            return dailyValuesEntities;
        }
    }
}
