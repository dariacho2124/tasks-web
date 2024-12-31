import { faClose, faFilePen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TaskCard = ({
  task,
  onEditClick,
  onDeleteClick,
  isEditing,
  onChangeInput,
  onToggleStatus,
  onCancelClick,
  process,
}) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    {process && (
      <div className="flex flex-col justify-center items-center ">
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-progress"></div>
        </div>
        <span className="text-lg text-gray-700 mt-4">Process ...</span>
      </div>
    )}
    <div className="text-lg font-semibold">
      {isEditing ? (
        <input
          type="text"
          name="title"
          value={task.title || ""}
          onChange={onChangeInput}
          className="border border-gray-300 p-2 rounded"
        />
      ) : (
        task.title
      )}
    </div>
    <div className="text-sm text-blue-500 mt-2 mb-2">{task.status}</div>
    <div className="text-sm text-purple-600">
      {task.createdAt && "Creado: "}
      {task.createdAt?.slice(0, 10)}
      <br />
      {task.updatedAt && "Actulizado: "}
      {task.updatedAt?.slice(0, 10)}
    </div>
    <div className="text-sm text-gray-700 mt-2">
      {isEditing ? (
        <textarea
          name="description"
          value={task.description || ""}
          onChange={onChangeInput}
          className="border border-gray-300 p-2 rounded w-full"
        />
      ) : (
        task.description
      )}
    </div>
    <div className="flex mt-4">
      {isEditing ? (
        <button
          onClick={() => onEditClick(task._id, true)}
          className="bg-purple-600 text-white w-[130px] h-10 rounded text-white p-2 mr-2"
        >
          Guardar
        </button>
      ) : task.status === "pending" ? (
        <>
          <button
            onClick={() => onToggleStatus(task._id, "completed")}
            className="bg-green-500 text-white w-70 h-10 rounded text-white  mr-2 p-2"
          >
            Marcar como completada
          </button>
        </>
      ) : null}
      {!isEditing ? (
        <>
          <button
            onClick={() => onEditClick(task._id)}
            className="bg-blue-500 text-white w-[120px] h-10 rounded text-white p-2 mr-2"
          >
            <FontAwesomeIcon className="mr-2" icon={faFilePen} />
            Editar
          </button>
          <button
            onClick={() => onDeleteClick(task._id)}
            className="bg-red-500 text-white w-[120px] h-10 rounded text-white p-2 mr-2"
          >
            <FontAwesomeIcon className="mr-2" icon={faTrash} />
            Eliminar
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => onCancelClick()}
            className="bg-red-500 text-white w-[120px] h-10 rounded text-white p-2 mr-2"
          >
            <FontAwesomeIcon className="mr-2" icon={faClose} />
            Cancelar
          </button>
        </>
      )}
    </div>
  </div>
);
export default TaskCard;

