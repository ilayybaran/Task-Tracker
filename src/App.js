import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: new Date().toLocaleString("tr-TR"),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (id, updatedTitle, updatedDescription) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: updatedTitle, description: updatedDescription } : task
    ));
    setEditingTaskId(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Görev Takip Uygulaması</h1>
      <AddTaskForm onAdd={addTask} />
      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>Tüm Görevler</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Tamamlananlar</button>
        <button onClick={() => setFilter("incomplete")} className={filter === "incomplete" ? "active" : ""}>Tamamlanmayanlar</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onEdit={setEditingTaskId}
        onUpdate={updateTask}
        onDelete={deleteTask}
        editingTaskId={editingTaskId}
      />
    </div>
  );
}

export default App;
