using Application.Common.Interfaces;
using AutoMapper;
using Flurl.Http;
using Infrastructure.Contracts.FoodDataCentral;
using Infrastructure.Exceptions;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class FoodDataCentralService : IFoodDataService
    {
        private readonly IMapper _mapper;

        private readonly string _baseUrl = "";
        private readonly string _apiKey = "";

        private string GetQueryApiKey() => $"api_key={_apiKey}";

        public FoodDataCentralService(IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;

            _baseUrl = configuration.GetValue<string>("FoodCentralData:ApiBaseUrl");
            _apiKey = configuration.GetValue<string>("FoodCentralData:ApiKey");
            if (!Uri.IsWellFormedUriString(_baseUrl, UriKind.Absolute))
            {
                throw new WrongConfigurationException($"Base Url is not well formed: {_baseUrl}");
            }
        }

        public async Task<Domain.Entities.Food[]> SearchFood(string searchTerm, int pageSize = 10, int pageNumber = 1)
        {
            string url = _baseUrl + "foods/search?" + GetQueryApiKey();
            var searchQuery = new SearchQuery(searchTerm, pageSize, pageNumber);
            try
            {
                SearchResult searchResult = await url.PostJsonAsync(searchQuery).ReceiveJson<SearchResult>();
                var dto = _mapper.Map<Domain.Entities.Food[]>(searchResult.foods);
                return dto;
            }
            catch (Exception e)
            {
                throw new FoodDataCentralApiRequestException(e.Message);
            }            
        }

        public async Task<Domain.Entities.Food>  GetFood(string id)
        {
            string url = $"{_baseUrl}food/{id}?{GetQueryApiKey()}&format=abridged";
            try
            {
                AbridgedFood searchResult = await url.GetJsonAsync<AbridgedFood>();
                var dto = _mapper.Map<Domain.Entities.Food>(searchResult);
                return dto;
            }
            catch (Exception e)
            {
                throw new FoodDataCentralApiRequestException(e.Message);
            }
        }
    }
}
