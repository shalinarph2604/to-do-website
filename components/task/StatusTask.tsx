import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useTask from '@/hooks/useTask';

const STATUS_OPTIONS = ['pending', 'on-going', 'done'];

interface StatusTaskProps {
  taskId: string;
  currentStatus: string;
}

const StatusTask: React.FC<StatusTaskProps> = ({ taskId, currentStatus }) => {

  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateTask } = useTask(taskId); 

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    
    setStatus(newStatus); 
    setIsLoading(true);

    try {
      await axios.patch(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      mutateTask();
      toast.success(`Task status updated to ${newStatus}.`);

    } catch (error) {
      console.error(error);
      toast.error('Failed to update status.');
      setStatus(currentStatus);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={isLoading}
      className={`
        p-1 
        text-sm 
        font-medium 
        border 
        rounded 
        cursor-pointer
        ${status === 'done' ? 'bg-green-100 text-green-800 border-green-400' : 
          status === 'on going' ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 
          'bg-gray-100 text-gray-800 border-gray-400'}
        ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          {opt.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default StatusTask;