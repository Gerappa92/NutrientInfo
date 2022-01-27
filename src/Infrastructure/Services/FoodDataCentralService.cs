using Application.Common.Interfaces;
using Application.Food.Queries;
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

        public async Task<Domain.Collections.FilteredFoodList> SearchFood(SearchFoodQuery query)
        {
            try
            {
                FoodDataSearchResult searchResult = await SearchFoodApiCall(query);
                var dto = _mapper.Map<Domain.Collections.FilteredFoodList>(searchResult);
                return dto;
            }
            catch (Exception e)
            {
                throw new FoodDataCentralApiRequestException(e.Message);
            }
        }

        public async Task<Domain.Entities.Food> GetFood(string id)
        {
            try
            {
                FoodDataEntityDetails entityDetails = await GetEntityDetailsApiCall(id);
                var dto = _mapper.Map<Domain.Entities.Food>(entityDetails);
                return dto;
            }
            catch (Exception e)
            {
                throw new FoodDataCentralApiRequestException(e.Message);
            }
        }
        private async Task<FoodDataSearchResult> SearchFoodApiCall(SearchFoodQuery query)
        {
            string url = GetSearchFoodApiUrl();
            var searchQuery = new FoodDataSearchQuery(query);
            FoodDataSearchResult searchResult = await url.PostJsonAsync(searchQuery).ReceiveJson<FoodDataSearchResult>();
            return searchResult;
        }

        private async Task<FoodDataEntityDetails> GetEntityDetailsApiCall(string id)
        {
            string url = GetEntityDetailsApiUrl(id);
            FoodDataEntityDetails entityDetails = await url.GetJsonAsync<FoodDataEntityDetails>();
            return entityDetails;
        }


        private string GetSearchFoodApiUrl()
        {
            return _baseUrl + "foods/search?" + GetQueryApiKey();
        }

        private string GetEntityDetailsApiUrl(string id)
        {
            return $"{_baseUrl}food/{id}?{GetQueryApiKey()}&format=abridged";
        }
    }
}
