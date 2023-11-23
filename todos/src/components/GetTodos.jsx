import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../App.module.css";

export const GetTodos = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/todos")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("Ошибка получения данных: ", error));
    }, []);

    const navigate = useNavigate();

    const openTaskDetails = (taskId) => {
        navigate(`task/${taskId}`);
    };

    const addTodo = () => {
        fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTodo }),
        })
            .then((response) => response.json())
            .then((data) => {
                setTodos([...todos, data]);
                setNewTodo("");
            })
            .catch((error) => console.error("Ошибка добавления данных: ", error));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const toggleSorting = () => {
        setIsSorted(!isSorted);
    };

    const sortedTodos = isSorted
        ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
        : todos;

    return (
        <>
            <button
                className={style.todoListItemButton}
                onClick={toggleSorting}>
                {isSorted ? "Отключить сортировку" : "Включить сортировку"}
            </button>

            <div>
                <input
                    className={style.todoListItemInput}
                    type="text"
                    placeholder="Поиск дела"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <ul className={style.todoList}>
                {sortedTodos.map((todo) => (
                    <li
                        className={`${style.todoListItem} ${todo.title && todo.title.includes(searchQuery) && searchQuery !== "" ? style.highlight : ""
                            }`}
                        key={todo.id}
                        onClick={() => openTaskDetails(todo.id)}
                    >
                        <div className={style.wrapper}>
                            <div className={style.todoListItemText}>
                                {todo.title}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    className={style.todoListItemInput}
                    type="text"
                    placeholder="Добавить новое дело"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className={style.todoListItemButton}
                    onClick={addTodo}>Добавить</button>
            </div>
        </>
    );
};
