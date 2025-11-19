import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useTasks = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/tasks', fetcher)

    return {
        tasks: data,
        isLoading,
        isError: error,
        mutateTasks: mutate
    }
}

export default useTasks