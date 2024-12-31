import React, { createContext, useContext, useEffect, useState } from "react";
import tasksData from "../../data";
import axiosInstance from "../../helper/axios";
import { useAuth } from "./AuthContext";
const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(tasksData);
  const [filter, setFilter] = useState("all");
  const [activeButton, setActiveButton] = useState("all");
  const { isAuthenticated } = useAuth();
  const [newTask, setNewTask] = useState(tasksData[0]);
  const [process, setProcess] = useState(false);
  const fetchTasks = async () => {
    const response = await axiosInstance.get("/tasks");
    setTasks(response.data);
    setFilter("all");
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter,
  );

  const handleFilterChange = (status) => {
    setFilter(status);
    setActiveButton(status);
  };

  const handleAddTask = async () => {
    setProcess(true);
    await axiosInstance.post("/tasks", newTask);

    await fetchTasks();
    setNewTask({ title: "", dueDate: "", description: "", status: "pending" });
    setShowForm(false);
    setProcess(false);
    document.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTaskId(null);
    setNewTask({ title: "", dueDate: "", description: "", status: "pending" });
  };

  const handleEditClick = async (id, edit) => {
    const task = tasks.find((task) => task._id === id);
    if (edit) {
      setProcess(true);
      await axiosInstance.put(`/tasks/${task._id}`, task);
      await fetchTasks();
    }
    setEditingTaskId(editingTaskId === id ? null : id);
    setProcess(false);
  };

  const handleChangeInput = (e, id) => {
    const { name, value } = e.target;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, [name]: value } : task,
      ),
    );
  };

  const handleToggleStatus = async (id, newStatus) => {
    setProcess(true);
    const task = tasks.find((task) => task._id === id);
    await axiosInstance.put(`/tasks/${id}`, {
      ...task,
      completed: newStatus ? true : false,
    });
    await fetchTasks();
    setProcess(false);
  };

  const handleDeleteClick = async (id) => {
    setProcess(true);
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?",
    );

    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error("Error al eliminar la tarea", error);
      }
    }
    setProcess(false);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        filter,
        setFilter,
        activeButton,
        setActiveButton,
        newTask,
        setNewTask,
        showForm,
        setShowForm,
        editingTaskId,
        setEditingTaskId,
        filteredTasks,
        handleFilterChange,
        handleAddTask,
        handleInputChange,
        handleCancel,
        handleEditClick,
        handleChangeInput,
        handleToggleStatus,
        handleDeleteClick,
        process,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
