import add_library from "../assets/icones/add_library.png";

const AddLibraryButton = ({ onClick, isAdded }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center rounded-full px-8 py-2 shadow-lg group overflow-hidden transition-all duration-300 
        backdrop-blur-[15px] border text-white 
        ${
          isAdded
            ? "button2"
            : "bg-gradient-to-br from-white/15 to-white/5 border-white/30 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
        }
      `}
    >
      <img
        src={add_library}
        alt="Add to library icon"
        className="h-8 w-8 flex-shrink-0 transition-all duration-300"
      />
      <span
        className="ml-0 max-w-0 overflow-hidden opacity-0 
        group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[200px] 
        transition-all duration-300 whitespace-nowrap font-sf text-lg font-bold"
      >
        {isAdded ? "Remove from library" : "Add to library"}
      </span>
    </button>
  );
};

export default AddLibraryButton;
