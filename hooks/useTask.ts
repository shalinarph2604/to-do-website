import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useTask = (taskId: string) => {
    const { data, error, isLoading, mutate } = useSWR(taskId ? `/api/tasks/${taskId}` : null, fetcher)

    return {
        task: data,
        isError: error,
        isLoading,
        mutateTask: mutate
    }
}

export default useTask