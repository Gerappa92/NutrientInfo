using Newtonsoft.Json;

namespace Infrastructure.Contracts.FoodDataCentral
{
    public class SearchQuery
    {
        public SearchQuery(string searchTerm, int pageSize, int pageNumber, string brandOwner)
        {
            Query = searchTerm;
            DataType = new string[] { };
            PageSize = pageSize;
            PageNumber = pageNumber;
            SortBy = "";
            SortOrder = "";
            BrandOwner = brandOwner ?? "";
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

    }
}
