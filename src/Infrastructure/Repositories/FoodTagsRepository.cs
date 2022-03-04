using Application.Common.Repositories;
using AutoMapper;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;

namespace Infrastructure.Repositories
{
    public class FoodTagsRepository : IFoodTagsRepository
    {
        private IAzureTableRepository<FoodTag> _tableRepository;
        private const string _tableName = "FoodTags";
        private readonly IMapper _mapper;

        public FoodTagsRepository(IAzureTableRepository<FoodTag> tableRepository, IMapper mapper)
        {
            _mapper = mapper;
            _tableRepository = tableRepository;
            _tableRepository.CreateTableClient(_tableName);
        }
        public IEnumerable<Domain.Entities.FoodTag> GetAll()
        {
            var foodTags = _tableRepository.GetAll();
            var foodTagsEntities = _mapper.Map<Domain.Entities.FoodTag[]>(foodTags);
            return foodTagsEntities;
        }
    }
}
