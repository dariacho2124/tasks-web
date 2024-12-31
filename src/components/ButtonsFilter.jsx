import React from "react";
import FilterButton from "./FilterButton";
import { useTasks } from "./context/TasksContext";
import {
  faPlus,
  faTasks,
  faCheckCircle,
  faClock,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const ButtonsFilter = () => {
  const { activeButton, setShowForm, setFilter, setActiveButton } = useTasks();

  const filterButtons = [
    { label: "Agregar nueva tarea", value: "add", icon: faPlus },
    { label: "Lista de tareas", value: "all", icon: faTasks },
    { label: "Completadas", value: "completed", icon: faCheckCircle },
    { label: "Pendientes", value: "pending", icon: faClock },
    { label: "Salir", value: "logout", icon: faSignOut },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    document.location.reload();
  };
  return (
    <div>
      {filterButtons.map(({ label, value, icon }) => (
        <FilterButton
          key={value}
          label={label}
          icon={icon}
          isActive={activeButton === value}
          onClick={() => {
            if (value === "add") {
              setShowForm(true);
              setActiveButton(value);
            } else if (value === "logout") {
              handleLogout();
            } else {
              setShowForm(false);
              setFilter(value);
              setActiveButton(value);
            }
          }}
        />
      ))}
    </div>
  );
};

export default ButtonsFilter;
