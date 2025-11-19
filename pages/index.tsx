import TaskFeed from "@/components/task/TasksFeed";
import Button from "@/components/Button";
import { signOut } from "next-auth/react";
import { useCallback, useEffect } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { mutate as globalMutate } from 'swr'; // Pastikan ini terimpor

export default function Home() {
    const loginModal = useLoginModal();
    const router = useRouter();
    const { user, mutate: mutateCurrentUser, isLoading } = useCurrentUser();

    // 💡 LOGIC BARU: Jika tidak ada user dan tidak sedang loading, tampilkan modal secara IMPERATIF
    if (!isLoading && !user && !loginModal.isOpen) {
        loginModal.onOpen();
    }
    
    // 💡 LOGIC BARU: Tutup modal segera setelah user ada
    if (user && loginModal.isOpen) {
        loginModal.onClose();
    }
    
    // 💡 HANDLE LOGOUT: Langsung redirect ke URL yang selalu memicu modal/login page
    const handleLogout = useCallback(async () => {
        try {
            // 1. Bersihkan sesi
            await signOut({ redirect: false });
            
            // 2. Bersihkan cache SWR
            await mutateCurrentUser(undefined, { revalidate: false }); // Ubah user ke null di cache
            globalMutate('/api/tasks', null, { revalidate: false }); // Bersihkan cache tasks
            
            // 3. ❌ JANGAN PANGGIL loginModal.onOpen() di sini
            
            // 4. 💡 REDIRECT PAKSA KE HALAMAN LOGIN (Misalnya: /login atau /auth)
            // Ini akan memastikan browser membersihkan state halaman tasks
            router.push('/login'); 

        } catch (error) {
            console.error('Logout failed:', error)
        }
    }, [mutateCurrentUser, router]);

    if (isLoading || !user) {
        return 
    }
    
    return (
        <>
            <div className="flex justify-end p-4">
                <Button
                    label="Logout"
                    onClick={handleLogout}
                />
            </div>
            <TaskFeed />
        </>
    );
}