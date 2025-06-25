import { FaEdit, FaTrash } from "react-icons/fa";

const FolderEditControls = ({ onRename, onDelete, folderId }) => {
  return (
    <div className="absolute top-2 right-2 flex flex-row space-x-2 z-40">
      {/* Rename Button */}
      <button
        onClick={() => onRename(folderId)}
        className="flex items-center justify-center text-white px-4 py-2 rounded-full group
        border border-white/30 backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
        hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
        transition-all duration-300 text-sm font-bold min-w-[40px] h-[40px]"
      >
        <div className="flex items-center">
          <FaEdit size={14} className="min-w-[14px]" />
          <span
            className="ml-0 max-w-0 opacity-0 overflow-hidden 
            group-hover:opacity-100 group-hover:ml-2 group-hover:max-w-[100px]
            transition-all duration-300"
          >
            Rename
          </span>
        </div>
      </button>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(folderId)}
        className="flex items-center justify-center text-white px-4 py-2 rounded-full group
        border border-white/30 backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
        hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
        transition-all duration-300 text-sm font-bold min-w-[40px] h-[40px]"
      >
        <div className="flex items-center">
          <FaTrash size={14} className="min-w-[14px]" />
          <span
            className="ml-0 max-w-0 opacity-0 overflow-hidden 
            group-hover:opacity-100 group-hover:ml-2 group-hover:max-w-[100px]
            transition-all duration-300"
          >
            Delete
          </span>
        </div>
      </button>
    </div>
  );
};

export default FolderEditControls;
