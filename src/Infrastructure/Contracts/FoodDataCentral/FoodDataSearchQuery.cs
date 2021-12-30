using Application.Food.Queries;
using Newtonsoft.Json;

namespace Infrastructure.Contracts.FoodDataCentral
{
    public class FoodDataSearchQuery
    {
        public FoodDataSearchQuery(SearchFoodQuery query)
        {
            Query = query.SearchTerm ?? "";
            DataType = new string[] { };
            PageSize = query.PageSize;
            PageNumber = query.PageNumber;
            SortBy = "";
            SortOrder = "";
            BrandOwner = query.BrandOwner ?? "";
            RequireAllWords = query.RequireAllWords;
        }
        [JsonProperty("query")]
        public string Query { get; set; }
        [JsonProperty("dataType")]
        public string[] DataType { get; private set; }
        [JsonProperty("pageSize")]
        public int PageSize { get; set; }
        [JsonProperty("pageNumber")]
        public int PageNumber { get; set; }
        [JsonProperty("sortBy")]
        public string SortBy { get; private set; }
        [JsonProperty("sortOrder")]
        public string SortOrder { get; private set; }
        [JsonProperty("brandOwner")]
        public string BrandOwner { get; set; }
        [JsonProperty("requireAllWords")]
        public bool RequireAllWords { get; set; }

    }
}
