import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { TaskDetails } from "./components/TaskDetails";
import style from "./App.module.css";
import TaskList from "./components/TaskList";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <div className={style.app}>
        <header className={style.appHeader}>
          <Routes>
            <Route path="/" element={<TaskList/>} />
            <Route path="task/:taskId" element={<TaskDetails />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
