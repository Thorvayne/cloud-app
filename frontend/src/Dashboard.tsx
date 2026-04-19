import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
};

const API_URL = "https://cloud-app-thorvayne-2026-api-fmbrfbc5g7beejg7.germanywestcentral-01.azurewebsites.net/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL + "/Tasks");
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
      await axios.post(API_URL + "/Tasks", {
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

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/Tasks/${id}`);
      setError("");
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Nie udało się usunąć zadania");
    }
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "red" }}>Cloud App Dashboard 🚀</h1>
      <p style={{ color: "green", fontWeight: "bold" }}>
        CI/CD działa poprawnie ✅
      </p>

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
            <li key={task.id} style={{ marginBottom: "10px" }}>
              {task.name} {task.isCompleted ? "✅" : "❌"}

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}