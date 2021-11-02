
public class SearchResult
{
    public FoodSearchCriteria foodSearchCriteria { get; set; }
    public int totalHits { get; set; }
    public int currentPage { get; set; }
    public int totalPages { get; set; }
    public Food[] foods { get; set; }
}
public class FoodSearchCriteria
{
    public string query { get; set; }
    public string[] dataType { get; set; }
    public int pageSize { get; set; }
    public int pageNumber { get; set; }
    public string sortBy { get; set; }
    public string sortOrder { get; set; }
    public string brandOwner { get; set; }
}

public class Food
{
    public int fdcId { get; set; }
    public string dataType { get; set; }
    public string description { get; set; }
    public string foodCode { get; set; }
    public FoodNutrient[] foodNutrients { get; set; }
    public string publicationDate { get; set; }
    public string scientificName { get; set; }
    public string brandName { get; set; }
    public string brandOwner { get; set; }
    public string gtinUpc { get; set; }
    public string ingredients { get; set; }
    public string ndbNumber { get; set; }
    public string additionalDescriptions { get; set; }
    public string allHighlightFields { get; set; }
    public float score { get; set; }
}

public class FoodNutrient
{
    public int nutrientId { get; set; }
    public string nutrientNumber { get; set; }
    public string nutrientName { get; set; }
    public float value { get; set; }
    public string unitName { get; set; }
    public string derivationCode { get; set; }
    public string derivationDescription { get; set; }
}
