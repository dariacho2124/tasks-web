import { faFileCirclePlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ButtonsFilter from "./ButtonsFilter";
import TaskCard from "./TaskCard";
import { useTasks } from "./context/TasksContext";
const Tasks = () => {
  const {
    filteredTasks,
    activeButton,
    handleFilterChange,
    showForm,
    setShowForm,
    newTask,
    handleInputChange,
    handleAddTask,
    handleCancel,
    editingTaskId,
    handleEditClick,
    handleChangeInput,
    handleToggleStatus,
    handleDeleteClick,
    process,
  } = useTasks();

  const handleAddTaskClick = () => {
    handleAddTask();
  };

  const handleCancelClick = () => {
    handleCancel();
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full mt-20 sm:w-4/12 bg-gray-100 p-4">
        <ButtonsFilter
          activeButton={activeButton}
          handleFilterChange={handleFilterChange}
          setShowForm={setShowForm}
        />
      </div>

      <div className="w-full sm:w-8/12 p-4 bg-gray-200">
        <div className="text-3xl text-purple-600 font-bold mt-4 mb-10">
          Tasks Manager ({filteredTasks.length})
          {process && showForm && (
            <div className="flex flex-col justify-center items-center ">
              <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-progress"></div>
              </div>
              <span className="text-lg text-gray-700 mt-4">Process ...</span>
            </div>
          )}
        </div>
        {showForm ? (
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Titulo de la tarea"
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {newTask.title?.length < 10 && (
              <p className="text-red-500 mb-2">Título demasiado corto</p>
            )}
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Descripción de la tarea"
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {newTask.description?.length < 10 && (
              <p className="text-red-500 mb-2">Descripción demasiado corta</p>
            )}
            <div>
              <div className="flex justify-between">
                {newTask.title?.length >= 10 &&
                  newTask.description?.length >= 10 && (
                    <button
                      onClick={handleAddTaskClick}
                      className="bg-blue-500 w-[140px] text-white p-2 rounded"
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faFileCirclePlus}
                      />
                      Agregar tarea
                    </button>
                  )}
                <button
                  onClick={handleCancelClick}
                  className="bg-red-500 w-[140px] text-white p-2 rounded"
                >
                  <FontAwesomeIcon className="mr-2" icon={faClose} />
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  isEditing={task._id === editingTaskId}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  onToggleStatus={handleToggleStatus}
                  onChangeInput={(e) => handleChangeInput(e, task._id)}
                  onCancelClick={handleCancelClick}
                  process={process && task._id === editingTaskId}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No hay tareas disponibles
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
