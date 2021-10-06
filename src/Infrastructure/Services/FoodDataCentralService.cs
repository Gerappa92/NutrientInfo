using Application.Common.Interfaces;
using Application.Food;
using AutoMapper;
using Flurl.Http;
using Infrastructure.Exceptions;
using Infrastructure.Mappings;
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

        private string GetQueryApiKey() => $"api_key={_apiKey}&";
        private string GetQuerySearchTerm(string searchTerm) => $"query={searchTerm}&";
        private string GetQueryPageSize(int pageSize) => $"pageSize={pageSize}&";
        private string GetQueryPageNumber(int pageNumber) => $"pageNumber={pageNumber}&";

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

        public async Task<SearchFoodDto> SearchFood(string searchTerm, int pageSize = 10, int pageNumber = 1)
        {
            const string action = "foods/search";
            var queryUrl = _baseUrl + action + "?" + GetQueryApiKey() + GetQuerySearchTerm(searchTerm) + GetQueryPageSize(pageSize) + GetQueryPageNumber(pageNumber);
            try
            {
                SearchResult searchResult = await queryUrl.GetJsonAsync<SearchResult>();
                var dto = _mapper.Map<SearchFoodDto>(searchResult);
                return dto;
            }
            catch (Exception e)
            {
                throw new FoodDataCentralApiRequestException("The exception occurred when data was requested");
            }            
        }
    }
}
