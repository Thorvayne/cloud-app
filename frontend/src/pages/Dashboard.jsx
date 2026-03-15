import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/api/tasks")
            .then(res => setTasks(res.data))
            .catch(() => setError("Nie udało się pobrać danych z API"));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Cloud App Dashboard</h1>
            <h2>Lista zadań</h2>

            {error && <p>{error}</p>}

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.isDone ? "Zrobione" : "Do zrobienia"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;