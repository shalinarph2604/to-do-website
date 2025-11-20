import { create } from 'zustand';

interface EditModalStore {
    isOpen: boolean;
    taskId: string | null;
    taskTitle: string | null;
    onOpen: (taskId: string, taskTitle: string) => void;
    onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false,
    taskId: null,
    taskTitle: null,
    onOpen: (taskId, taskTitle) => set({ isOpen: true, taskId, taskTitle }),
    onClose: () => set({ isOpen: false, taskId: null, taskTitle: null }),
}))

export default useEditModal;