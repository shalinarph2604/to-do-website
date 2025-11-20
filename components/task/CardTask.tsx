import axios from 'axios';
import { toast } from 'react-hot-toast';
import useTasks from '@/hooks/useTasks';
import useEditModal from '@/hooks/useEditModal';

import TaskActionsMenu from './TaskActionsMenu';
import StatusTask from './StatusTask';

interface TaskProps {
    task: {
        id: string;
        title: string;
        status: string;
    };
}

const CardTask: React.FC<TaskProps> = ({ task }) => {
    const { mutateTasks } = useTasks();
    const editModal = useEditModal();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); 
        
        if (!window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
            return;
        }

        try {
            await axios.delete(`/api/tasks/${task.id}`); 
            toast.success('Task deleted successfully.');
            mutateTasks();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task.');
        }
    };

    return (
        <div className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div className="flex-1">
                <p className="font-semibold">{task.title}</p>
            
                <StatusTask
                    taskId={task.id}
                    currentStatus={task.status}
                />
            </div>

            {/* Meneruskan fungsi handler sebagai props */}
            <TaskActionsMenu 
                taskId={task.id}
                taskTitle={task.title}
                onDeleteClick={handleDelete}
            />
        </div>
    );
};

export default CardTask;