import { Box, Card, Container } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';

export default function Content() {
    let [posts, setPosts] = useState(null);

    useEffect(() => {
        async function getResults() {
            const results = await axios('http://localhost:4000/');
            console.log(results.data.topTenPosts)
            setPosts(results.data)
        }
        getResults()
    }, [])
    console.log(posts)
    return (
        <Box>
            <Container
            sx={{maxWidth:"65%"}}
            >
                { posts?
                    posts.topTenPosts.map((post)=>{
                       return <PostCard 
                                key={post.postIdHacker}
                                postId={post.postIdHacker} 
                                author={post.data.by}
                                url={post.data.url}
                                title={post.data.title}
                                score={post.data.score}
                            />
                    }): <div>Loading</div>
                }
                
            </Container>
        </Box>
    )
}
