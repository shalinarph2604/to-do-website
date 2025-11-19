/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import supabase from "@/libs/supabase";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH' && req.method !== 'DELETE' && req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { taskId } = req.query

        const { currentUser } = await serverAuth(req, res)

        if (!currentUser) {
            return res.status(401).json({ message: 'User not authenticated' })
        }

        if (req.method === 'GET') {
            const { data: task, error: errorTask} = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', currentUser.id)
                .single()

                if (errorTask) {
                    throw new Error(errorTask.message)
                }

            return res.status(200).json(task)
        }

        if (req.method === 'PATCH') {
            const { title, status } = req.body
            const VALID_STATUSES = ['pending', 'on-going', 'done']
            const updateFields: { title?: string; status?: string } = {};

            if (status) {
                if (typeof status !== 'string' || !VALID_STATUSES.includes(status.toLowerCase())) {
                    return res.status(400).json({ 
                        message: `Invalid status value. Must be one of: ${VALID_STATUSES.join(', ')}` 
                    });
                }

                updateFields.status = status.toLowerCase();
            }

        if (title) {
            if (typeof title !== 'string') {
                return res.status(400).json({ message: 'Title must be a string.' });
            }

            updateFields.title = title;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update.' });
        }

            const { data: updatedTask, error: errorUpdate } = await supabase
                .from('tasks')
                .update({
                    status: status,
                    title
                })
                .eq('id', taskId)
                .eq('user_id', currentUser.id)
                .select()
                .single()

                if (errorUpdate) return res.status(400).json({ message: errorUpdate.message })
            
            return res.status(200).json(updatedTask)
        }

        if (req.method === 'DELETE') {
            const { data: deletedTask, error: errorDelete } = await supabase
                .from('tasks')
                .delete()
                .eq('id', taskId)
                .eq('user_id', currentUser.id)
                .select()
                .single()

                if (errorDelete) return res.status(400).json({ message: errorDelete.message })
            
            return res.status(200).json(deletedTask)
        }

    } catch (error: any) {
        console.error('Error in dish API:', error)
        return res.status(500).json({ message: error.message || 'Internal server error' })
    }
}