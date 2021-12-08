using Application.Common.Interfaces;
using AutoMapper;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

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

        public IEnumerable<Domain.Entities.FoodTag> Filter(IEnumerable<Domain.Entities.NutrientItem> nutrients)
        {
            var tags = GetAll();

            if (nutrients.Count() == 0 || tags.Count() == 0)
            {
                return new Domain.Entities.FoodTag[0];
            }

            var filteredTags = new List<Domain.Entities.FoodTag>();

            foreach (var tag in tags)
            {
                var nutrient = nutrients.FirstOrDefault(n => n.Id == tag.NutrientId);
                if (nutrient is null)
                {
                    continue;
                }

                if(tag.MinDailyValuePercentage <= nutrient.DailyValuePercentage 
                    && tag.MaxDailyValuePercentage >= nutrient.DailyValuePercentage)
                {
                    filteredTags.Add(tag);
                }
            }

            return filteredTags;
        }
    }
}
