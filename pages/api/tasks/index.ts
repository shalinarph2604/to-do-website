/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import supabase from "@/libs/supabase";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req, res)

        if (!currentUser) {
            return res.status(401).json({ message: 'User not authenticated' })
        }

        if (req.method === 'GET') {
            const { data: tasks, error: errorTasks } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', currentUser.id)

                if (errorTasks) {
                    throw new Error(errorTasks.message)
                }

                if (!tasks || tasks.length === 0) {
                    return res.status(200).json([])
                }
            
            return res.status(200).json(tasks)
        }

        if (req.method === 'POST') {
            const { title, status: incomingStatus } = req.body

            const taksStatus = incomingStatus || 'pending'
            
            const { data: postTask, error: postTaskError } = await supabase
                .from('tasks')
                .insert([
                    {
                        user_id: currentUser.id,
                        title: title,
                        status: taksStatus
                    }
                ])
                .select()
                .single()

                if (postTaskError) { 
                    return res.status(400).json(postTaskError.message || 'Failed to post the taks')
                }
            
            return res.status(200).json(postTask)
        }

    } catch (error: any) {
        console.log('Error in user balance API:', error)
        return res.status(500).json({ message: error.message || 'Internal server error' })
    }
}