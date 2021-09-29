namespace Application.Food
{
    public class SearchFoodDto
    {
        public string Query { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int TotalHits { get; set; }
        public FoodDto[] Foods { get; set; }
    }
}
