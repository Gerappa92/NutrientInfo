import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const GenericList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
}) => {
  return (
    <ListContainer>
      {items.map((item, i) => (
        <ItemComponent key={i} {...{ [resourceName]: item }} />
      ))}
    </ListContainer>
  );
};
