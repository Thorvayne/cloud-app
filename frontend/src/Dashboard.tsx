import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/Tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Błąd pobierania danych z API");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ładowanie...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cloud App Dashboard</h1>

      {tasks.length === 0 ? (
        <p>Brak zadań</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name} {task.isCompleted ? "V" : "X"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}