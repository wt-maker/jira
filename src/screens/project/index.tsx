import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Epic from "screens/epic";
import Kanban from "screens/kanban";

const Project = () => {
  return (
    <div>
      <h1>Project Screen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="/kanban" element={<Kanban />}></Route>
        <Route path="/epic" element={<Epic />}></Route>
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};

export default Project;
