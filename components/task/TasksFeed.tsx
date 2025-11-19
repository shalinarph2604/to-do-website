/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../Button"; // Tombol standar Anda
import CardTask from "./CardTask";
import useNewTaskModal from "@/hooks/useNewTaskModal";
import useTasks from "@/hooks/useTasks";
import React from 'react';

const TaskFeed: React.FC = () => {
    const { tasks, isLoading, isError } = useTasks();
    const newTaskModal = useNewTaskModal();

    const onOpenModal = () => {
        newTaskModal.onOpen();
    };

    if (isLoading) {
        return (
            <div className="text-center p-8">
                <p className="text-xl text-sky-500 animate-pulse">Memuat daftar tugas...</p>
            </div>
        );
    }

    if (isError) {
        return
    }
    
    const isEmpty = !tasks || tasks.length === 0;

    return (
        <div className="flex flex-col gap-6 p-4">
            
            {/* Tombol Add New Task */}
            <div className="flex justify-end">
                <Button 
                    onClick={onOpenModal}
                    disabled={isLoading}
                    label="➕ Add New Task" 
                />
            </div>

            {/* Daftar Tugas (Mapping CardTask) */}
            <div className="flex flex-col gap-3">
                
                {isEmpty ? (
                    <div className="text-center p-10 border-2 border-dashed rounded-lg text-gray-500">
                        <h3 className="text-lg font-semibold mb-2">Belum ada tugas!</h3>
                    </div>
                ) : (
                    tasks.map((task: any) => (
                        <CardTask 
                            key={task.id} 
                            task={task}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskFeed;