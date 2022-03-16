import { Tag } from "antd";
import styled from "styled-components";

const TagsContainer = styled.div`
  margin: 5px;
`;

const FoodTag = styled(Tag)`
  margin-bottom: 5px;
`;

export const FoodTags = ({ tags }) => {
  const getTag = (tag) => {
    const color = getTagColor(tag.mark);
    return (
      <FoodTag key={tag.name} color={color}>
        {tag.name}
      </FoodTag>
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
  return <TagsContainer>{tags.map((tag) => getTag(tag))}</TagsContainer>;
};
