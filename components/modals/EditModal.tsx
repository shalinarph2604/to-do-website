import Modal from "../Modal";
import Input from "../Input";
import { toast } from "react-hot-toast";
import axios from "axios";

import { useState, useCallback, useEffect } from "react";
import useTasks from "@/hooks/useTasks";    
import useEditModal from "@/hooks/useEditModal"; 
import useTask from "@/hooks/useTask";        

const EditModal = () => {
    
    const editModal = useEditModal(); 
    const taskId = editModal.taskId; 

    const { task: taskData, isLoading: isTaskLoading, mutateTask } = useTask(taskId);
    
    const { mutateTasks } = useTasks();

    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (taskData) {
            setTitle(taskData.title || '');
        }
    }, [taskData]);

    const submitTask = useCallback(async () => {
        try {
            setIsLoading(true);
            
            if (!title.trim()) {
                 toast.error('Title cannot be empty');
                 return;
            }

            await axios.patch(`/api/tasks/${taskId}`, { title });

            mutateTask();
            mutateTasks();

            toast.success('Title successfully updated!');
            editModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update title.');
        } finally {
            setIsLoading(false);
        }
    }, [mutateTask, mutateTasks, editModal, title, taskId]);

    if (!editModal.isOpen || !taskId) {
        return null;
    }

    const overallLoading = isLoading || isTaskLoading;

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Title Task"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                disabled={overallLoading}
            />
            {isTaskLoading && (
                <p className="text-center text-sky-500">Loading task data...</p>
            )}
        </div>
    );

    return (
        <Modal 
            disabled={overallLoading}
            isOpen={editModal.isOpen}
            title="Edit Task Title"
            actionLabel="Save Changes"
            onClose={editModal.onClose}
            onSubmit={submitTask}
            body={bodyContent}
        />
    );
};

export default EditModal;