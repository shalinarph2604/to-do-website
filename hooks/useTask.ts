import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useTask = (taskId: string) => {
    const { data, error, isLoading, mutate } = useSWR(`/api/tasks/${taskId}`, fetcher)

    return {
        task: data,
        isError: error,
        isLoading,
        mutateTask: mutate
    }
}

export default useTask