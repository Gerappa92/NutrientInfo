namespace Application.Food.Dto
{
    public class FilteredFoodListDto
    {
        public FoodDto[] Foods { get; set; }
        public string Query { get; set; }
        public string TotalHits { get; set; }
    }
}
