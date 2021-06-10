import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SorfWareLogo } from "assets/software-logo.svg";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Project from "screens/project";
import { resetRoute } from "utils";
import ProjectPopover from "components/project-popover";
import { ProjectModal } from "screens/project-list/project-modal";

const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />}></Route>
            <Route path="/projects/:projectId/*" element={<Project />}></Route>
            <Navigate to="/projects" />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SorfWareLogo width="18rem" color="rgb(38, 132, 255)" />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <UserStatus />
      </HeaderRight>
    </Header>
  );
};

const UserStatus = () => {
  const { user, logout } = useAuth();
  return (
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
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

export default AuthenticatedApp;
