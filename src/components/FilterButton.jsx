import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterButton = ({ label, isActive, onClick,icon}) => {
    return (
      <button
        onClick={onClick}
        className={`block w-[80%] mx-auto h-[50px] p-0 text-center mb-6 rounded-full flex items-center justify-center ${
          isActive ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
        {label}
      </button>
    );
  };
  
  export default FilterButton;
  