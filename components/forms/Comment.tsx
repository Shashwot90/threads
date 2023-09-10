"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
//import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
}
const Comment = ({ threadId, currentUserImg, currentUserId}: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ''
        }
    });

    const onSubmit  = async (values: z.infer<typeof CommentValidation>) => {
        // await createThread({
        //     text: values.thread, 
        //     author: userId, 
        //     communityId: null, 
        //     path: pathname
        // })

        router.push('/');
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col justify-start gap-10">
            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                   Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <Input 
                      type="text"
                      placeholder="Comment..."
                      className="np-focus text-light-1 outline-none"
                      {...field}
                     />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" className="bg-primary-500">Post Thread</Button>
        </form>
        </Form>
    )
}

export default Comment;