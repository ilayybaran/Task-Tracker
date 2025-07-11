import { useState } from "react";

function TaskItem({ task, onToggle, onEdit, onUpdate, onDelete, editingTaskId }) {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);

  const isEditing = editingTaskId === task.id;

  const handleSave = () => {
    if (editedTitle.trim() && editedDesc.trim()) {
      onUpdate(task.id, editedTitle, editedDesc);
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <div className="info">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
            />
            <button onClick={handleSave}>Kaydet</button>
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>{task.createdAt}</span>
            <div className="buttons">
              <button onClick={() => onEdit(task.id)}>Düzenle</button>
              <button onClick={() => onDelete(task.id)}>Sil</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
