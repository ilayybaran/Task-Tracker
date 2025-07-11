import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onEdit, onUpdate, onDelete, editingTaskId }) {
  if (tasks.length === 0) {
    return <p>Hiç görev bulunamadı.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onDelete={onDelete}
          editingTaskId={editingTaskId}
        />
      ))}
    </div>
  );
}

export default TaskList;
