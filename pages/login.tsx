import useLoginModal from '@/hooks/useLoginModal';
import { useEffect } from 'react';

export default function LoginPage() {
    const loginModal = useLoginModal();

    useEffect(() => {
        // 💡 Pastikan modal terbuka saat komponen dimuat
        if (!loginModal.isOpen) {
            loginModal.onOpen();
        }
    }, [loginModal]);

    return (
        <div className="text-center py-20">
            {/* Konten halaman kosong, modal akan muncul di atasnya */}
        </div>
    );
}