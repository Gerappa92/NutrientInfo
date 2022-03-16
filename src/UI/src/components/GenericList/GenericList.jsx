export const GenericList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
  handleAction,
}) => {
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent key={i} {...{ [resourceName]: item }} />
      ))}
    </>
  );
};
