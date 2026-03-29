import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/Tasks");
      setTasks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Nie udało się pobrać danych z API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTaskName.trim()) {
      setError("Nazwa zadania nie może być pusta");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/Tasks", {
        name: newTaskName,
        isCompleted: false,
      });

      setNewTaskName("");
      setError("");
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Nie udało się dodać zadania");
    }
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cloud App Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Wpisz nowe zadanie..."
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px" }}>
          Dodaj zadanie
        </button>
      </div>

      {error && <p>{error}</p>}

      {tasks.length === 0 ? (
        <p>Brak zadań</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name} {task.isCompleted ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}