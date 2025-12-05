import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useTask from '@/hooks/useTask';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectGroup, 
  SelectItem,
  SelectLabel
} from '@/components/ui/select'; // Hapus SelectLabel karena tidak wajib

const STATUS_OPTIONS = ['Pending', 'On-going', 'Done'];

interface StatusTaskProps {
  taskId: string;
  currentStatus: string;
}

const StatusTask: React.FC<StatusTaskProps> = ({ taskId, currentStatus }) => {

  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  // Perhatikan: Menggunakan useTask(taskId) mungkin akan me-revalidate
  // seluruh task list, jika itu yang dimaksudkan.
  const { mutateTask } = useTask(taskId); 

  // 💡 PERUBAHAN UTAMA: Handler sekarang menerima newStatus (string)
  const handleStatusChange = async (newStatus: string) => {
    
    // Optimistic UI Update: Langsung ubah state
    const oldStatus = status; // Simpan status lama untuk rollback jika gagal
    setStatus(newStatus); 
    setIsLoading(true);

    try {
      await axios.patch(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      // Panggil mutateTask setelah berhasil update di server
      mutateTask();
      toast.success(`Task status updated to ${newStatus.toUpperCase()}.`);

    } catch (error) {
      console.error(error);
      toast.error('Failed to update status. Status rolled back.');
      // Rollback status jika terjadi error
      setStatus(oldStatus);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk mendapatkan warna berdasarkan status (opsional, untuk class Tailwind)
  const getStatusClasses = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Done':
        return 'bg-green-500 text-green-50 border-green-500';
      case 'On-going':
        return 'bg-yellow-400 text-yellow-50 border-yellow-400';
      default:
        return 'bg-gray-500 text-gray-50 border-gray-500';
    }
  };

  return (
    // 1. Komponen <Select> menerima value dan onValueChange
    <Select 
        value={status} 
        onValueChange={handleStatusChange} 
        disabled={isLoading}  
    >
      {/* 2. SelectTrigger sebagai tombol yang terlihat */}
      <SelectTrigger 
        className={`
          w-[120px] 
          pr-1 text-sm font-sans font-medium border rounded-lg shadow-md cursor-pointer
          ${getStatusClasses(status)}
          ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        {/* 3. SelectValue menampilkan nilai yang dipilih saat ini */}
        <SelectValue placeholder="Select Status">
            {/* Tampilkan status yang saat ini dipilih dalam huruf kapital */}
            {status} 
        </SelectValue>
      </SelectTrigger>

      {/* 4. SelectContent sebagai wadah pop-up untuk opsi */}
      <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200">
        <SelectGroup>
          <SelectLabel className="font-normal text-gray-600">Status</SelectLabel>
          {STATUS_OPTIONS.map((opt) => (
            // 5. SelectItem untuk setiap opsi
            <SelectItem key={opt} value={opt} className="hover:bg-gray-100 font-semibold cursor-pointer">
              {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusTask;