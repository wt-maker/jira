export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((item, index) => {
        <span key={index}>
          {item}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}></span>
          )}
        </span>;
      })}
    </>
  );
};
