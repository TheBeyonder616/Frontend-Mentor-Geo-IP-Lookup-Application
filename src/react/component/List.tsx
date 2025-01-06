type ListType<T extends Record<string, string>> = {
  object: T;
  fallback?: string;
};

const List = <T extends Record<string, string>>({
  object,
  fallback = "NA",
}: ListType<T>) => {
  const ListItem = () => {
    return Object.entries(object).map(([key, value]) => (
      <li className="header__list-item heading-secondary" key={key}>
        {key}
        <strong className="strong">{value ? value : fallback}</strong>
      </li>
    ));
  };

  return (
    <ul className="header__list">
      <ListItem />
    </ul>
  );
};

export default List;
