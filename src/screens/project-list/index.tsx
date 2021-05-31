import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const ProjectListScreen = () => {
  const [list, setList] = useState([]);

  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: debouncedParam }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
