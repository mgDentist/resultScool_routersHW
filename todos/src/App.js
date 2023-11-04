import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GetTodos } from "./components/GetTodos";
import { TaskDetails } from "./components/TaskDetails";
import style from "./App.module.css";

const TaskList = () => (
  <div>
    <h1>Список дел</h1>
    <GetTodos />
  </div>
);

const App = () => {
  return (
    <Router>
      <div className={style.app}>
        <header className={style.appHeader}>
          <Routes>
            <Route path="/" element={<TaskList/>} />
            <Route path="task/:taskId" element={<TaskDetails />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
