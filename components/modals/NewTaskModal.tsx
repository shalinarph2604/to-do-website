import Modal from "../Modal";
import Input from "../Input";
import { toast } from "react-hot-toast";
import axios from "axios";

import { useState, useCallback } from "react";
import useNewTaskModal from "@/hooks/useNewTaskModal";
import useTasks from "@/hooks/useTasks"

const NewTaskModal = () => {
    const newTaskModal = useNewTaskModal()
    const { mutateTasks } = useTasks()

    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const submitTask = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.post('/api/tasks', {
                title,
                status: 'pending'
            })

            mutateTasks()

            toast.success('Success added new task')
            newTaskModal.onClose()
            setTitle('')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [mutateTasks, newTaskModal, title])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Title Task"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={newTaskModal.isOpen}
            title="Add New Task"
            actionLabel="Add Task"
            onClose={newTaskModal.onClose}
            onSubmit={submitTask}
            body={bodyContent}
        />
    )
}

export default NewTaskModal