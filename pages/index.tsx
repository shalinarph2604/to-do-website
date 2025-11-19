import TaskFeed from "@/components/task/TasksFeed";
import Button from "@/components/Button";
import { signOut } from "next-auth/react";
import { useCallback } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { mutate as globalMutate } from 'swr';

export default function Home() {
    const loginModal = useLoginModal();
    const router = useRouter();
    const { user, mutate: mutateCurrentUser, isLoading } = useCurrentUser();

    if (!isLoading && !user && !loginModal.isOpen) {
        loginModal.onOpen();
    }
    
    if (user && loginModal.isOpen) {
        loginModal.onClose();
    }
    
    const handleLogout = useCallback(async () => {
        try {
            
            await signOut({ redirect: false });
            
            await mutateCurrentUser(undefined, { revalidate: false }); 
            globalMutate('/api/tasks', null, { revalidate: false }); 
            
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