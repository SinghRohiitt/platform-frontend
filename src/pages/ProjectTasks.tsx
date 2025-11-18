import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { createTask, getTasksByProject, assignTaskToUser } from "../api/tasks";


export default function ProjectTasks() {
  const { projectId } = useParams();

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    loadTasks();
    // loadMembers();
  }, []);

  const loadTasks = async () => {
    const res = await getTasksByProject(projectId!);
    setTasks(res.tasks);
  };

  // const loadMembers = async () => {
  //   const res = await getProjectMembers(projectId!);
  //   setMembers(res.members);
  // };

  // Create Task
  const handleCreateTask = async (e: any) => {
    e.preventDefault();
    try {
      await createTask(projectId!, {
        title,
        description,
        priority,
        assignedTo: assignedTo || null,
      });

      loadTasks();
      setOpen(false);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setAssignedTo("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create task");
    }
  };

  const columns = {
    PENDING: tasks.filter((t) => t.status === "PENDING"),
    COMPLETED: tasks.filter((t) => t.status === "COMPLETED"),
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    await assignTaskToUser(taskId, null); // keep assignment
    await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
      credentials: "include",
    });

    loadTasks();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Project Tasks</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => setOpen(true)}>
          + Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow">
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            <form className="space-y-3" onSubmit={handleCreateTask}>
              <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <select className="w-full border p-2 rounded" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              {/* Assign Dropdown */}
              <select className="w-full border p-2 rounded" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                <option value="">Unassigned</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>

              <button className="w-full bg-indigo-600 text-white py-2 rounded">Create</button>
            </form>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(columns).map(([status, taskList]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div className="bg-gray-100 p-4 rounded-lg min-h-[400px]" {...provided.droppableProps} ref={provided.innerRef}>
                  <h2 className="text-lg font-bold mb-3">{status === "PENDING" ? "🟡 Pending" : "✅ Completed"}</h2>

                  {taskList.map((task, index) => (
  <Draggable draggableId={task.id} index={index} key={task.id + status}>
                      {(provided) => (
                        <div className="bg-white p-3 rounded shadow mb-3 space-y-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>

                          {/* Assigned User */}
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex justify-center items-center text-sm">
                              {task.assigned?.name?.charAt(0) || "?"}
                            </div>
                            <span>{task.assigned?.name || "Unassigned"}</span>
                          </div>

                          {/* Assign Dropdown */}
                          <select
                            className="w-full border p-2 rounded"
                            value={task.assignedTo || ""}
                            onChange={async (e) => {
                              await assignTaskToUser(task.id, e.target.value);
                              loadTasks();
                            }}
                          >
                            <option value="">Unassigned</option>
                            {members.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name} ({m.role})
                              </option>
                            ))}
                          </select>

                          {/* Priority Badge */}
                          <span className={`px-2 py-1 text-xs rounded ${task.priority === "HIGH" ? "bg-red-100 text-red-700" : task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                            {task.priority}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
