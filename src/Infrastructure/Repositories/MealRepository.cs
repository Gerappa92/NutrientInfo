using Application.Common.Repositories;
using Domain.Entities;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class MealRepository : IMealRepository
    {
        private const string TABLE_NAME = "Meals";
        
        private readonly IAzureTableRepository<MealEntity> _tableClient;

        public MealRepository(IAzureTableRepository<MealEntity> azureTable)
        {
            _tableClient = azureTable;
            _tableClient.CreateTableClient(TABLE_NAME);
        }

        public async Task AddAsync(Meal meal)
        {
            MealEntity entity = new MealEntity(meal);
            await _tableClient.AddAsync(entity);
        }

        public async Task<Meal> GetAsync(string id)
        {
            var mealEntity = await _tableClient.GetByIdAsync(id);
            var meal = mealEntity.Map();
            return meal;
        }

        public async Task<IEnumerable<Meal>> GetUsersMeals(string author)
        {
            var mealEntities = await _tableClient.QueryAsync(m => m.Author == author);
            List<Meal> meals = new List<Meal>();
            foreach (var entity in mealEntities)
            {
                var meal = entity.Map();
                meals.Add(meal);
            }
            return meals;
        }

        public async Task DeleteAsync(string id)
        {
            var mealEntity = await _tableClient.GetByIdAsync(id);
            await _tableClient.DeleteAsync(mealEntity);
        }

        public async Task UpdateAsync(Meal meal)
        {
            var mealEntity = new MealEntity(meal);
            await _tableClient.UpdateAsync(mealEntity);
        }


    }
}
