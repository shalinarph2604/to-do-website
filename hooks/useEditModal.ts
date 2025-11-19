import { create } from 'zustand';

interface EditModalStore {
    isOpen: boolean;
    taskId: string;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false,
    taskId: "",
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useEditModal;