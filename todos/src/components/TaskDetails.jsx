export const TaskDetails = ({ task }) => {
    console.log(task)
    task ? <div>{task.title}</div> : <div>Loading...</div>

    return (
        <div>
            <h2>Полная информация о задаче</h2>
            <p>{task.title}</p>
        </div>
    );
};


