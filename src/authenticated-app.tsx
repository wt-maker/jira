import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SorfWareLogo } from "assets/software-logo.svg";
import { useDocumentTitle } from "utils/use-document-title";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Project from "screens/project";
import { resetRoute } from "utils";

const AuthenticatedApp = () => {
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />}></Route>
            <Route path="/projects/:projectId/*" element={<Project />}></Route>
            <Navigate to="/projects" />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { user, logout } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SorfWareLogo width="18rem" color="rgb(38, 132, 255)" />
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.div``;

export default AuthenticatedApp;
