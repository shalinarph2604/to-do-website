import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react'; 

interface TaskActionsMenuProps {
  taskId: string;
  taskTitle: string;
  onEditClick: (e: React.MouseEvent) => void; 
  onDeleteClick: (e: React.MouseEvent) => void;
}

const TaskActionsMenu: React.FC<TaskActionsMenuProps> = ({ 
  onEditClick, 
  onDeleteClick 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuAction = (handler: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
      handler(e); 
      setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      
      {/* Tombol Trigger (Tiga Titik) */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="
          p-1 
          rounded-full 
          hover:bg-gray-200 
          transition
          focus:outline-none focus:ring-2 focus:ring-sky-500
        "
        aria-expanded={isOpen}
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {/* Konten Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10"
        >
          <div className="py-1">
            
            {/* Opsi EDIT - Panggil handler yang dibungkus */}
            <div
              onClick={handleMenuAction(onEditClick)}
              className="
                flex items-center px-4 py-2 text-sm text-gray-700 
                hover:bg-gray-100 cursor-pointer
              "
            >
              <Edit className="mr-3 h-4 w-4" />
              Edit Title
            </div>

            {/* Opsi DELETE - Panggil handler yang dibungkus */}
            <div
              onClick={handleMenuAction(onDeleteClick)}
              className="
                flex items-center px-4 py-2 text-sm text-red-600 
                hover:bg-red-50 cursor-pointer
              "
            >
              <Trash2 className="mr-3 h-4 w-4" />
              Delete Task
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskActionsMenu;