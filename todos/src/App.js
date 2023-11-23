import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
