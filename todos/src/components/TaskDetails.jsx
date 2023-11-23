import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const TaskDetails = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/todos/${taskId}`)
            .then((response) => response.json())
            .then((data) => {
                setTask(data);
                setEditedTitle(data.title);
            })
            .catch(error => console.error("Ошибка", error));
    }, [taskId]);

    const deleteTodo = (id) => {
        fetch(`http://localhost:3001/todos/${taskId}`, {
            method: "DELETE",
        })
            .then(() => {
                navigate('/');
            })
            .catch((error) => console.error("Ошибка удаления данных: ", error));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setEditedTitle(task.title);
    };

    const handleEditChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const saveEdit = () => {
        editTodo(editedTitle);
        setIsEditing(false);
    }

    const editTodo = (newTitle) => {
        fetch(`http://localhost:3001/todos/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle }),
        })
            .then(() => {
                setTask({ ...task, title: newTitle });
            })
            .catch((error) => console.error("Ошибка редактирования данных: ", error));
    };

    const goBack = () => {
        navigate(-1);
    }
    return (
        <div>
        <button onClick={goBack}>Назад</button>
            <h2>Полная информация о задаче</h2>
            {task ? (
                <div>
                    {isEditing ? (
                        <>
                            <input type="text" value={editedTitle} onChange={handleEditChange} />
                            <button onClick={saveEdit}>Сохранить</button>
                        </>
                    ) : (
                        <>
                            <p>{task.title}</p>
                            <button onClick={toggleEdit}>Редактировать</button>
                            <button onClick={deleteTodo}>Удалить</button>
                        </>
                    )}
                </div>
            ) : <p>Loading...</p>}
        </div>
    );
};
