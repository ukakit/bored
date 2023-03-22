'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPost({ post }: any) {
    const [newTitle, setNewTitle] = useState(post.title);
    const [newContent, setNewContent] = useState(post.content);
    
    const router = useRouter();

    const edit = async() => {
        await fetch(`http://127.0.0.1:8090/api/collections/posts/records/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newTitle, newContent,
            }),
        }).then((response) => response.json())
        .then((json) => console.log(json));
        // setNewContent(post.content);
        // setNewTitle(post.title);

        // router.refresh();
    }
    return(
        <form onSubmit={edit}>
            <h3>Edit Post</h3>
            <input
                type='text'
                placeholder='Title'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
                placeholder='Content'
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
            />
            <button type='submit'>
                Submit Changes
            </button>
        </form>
    )
}