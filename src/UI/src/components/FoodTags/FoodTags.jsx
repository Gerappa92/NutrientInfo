import { Tag } from "antd";

export const FoodTags = ({ tags }) => {
  console.log(tags);
  const getTag = (tag) => {
    const color = getTagColor(tag.mark);
    return (
      <Tag key={tag.name} color={color}>
        {tag.name}
      </Tag>
    );
  };

  const getTagColor = (mark) => {
    switch (mark) {
      case "positive":
        return "green";
      case "negative":
        return "red";
      default:
        break;
    }
  };
  return <>{tags.map((tag) => getTag(tag))}</>;
};
