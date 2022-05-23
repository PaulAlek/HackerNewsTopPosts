/* eslint-disable react/jsx-no-target-blank */
import { Button, Card, CardActions, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

export default function PostCard(props) {
    const postId = props.postId
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState("");

    useEffect(() => {
        if (!comments) {
            async function getResults() {
                const results = await axios(`http://localhost:4000/${postId}`);
                console.log(results.data.allComments);
                setComments(results.data.allComments)
            }
            getResults()
        }
    }, [])
    return (
        <Card
            variant="outlined"
        >
            <CardContent>
                <Typography variant="h6" component="h6">
                    <a
                        style={{
                            color: "inherit",
                            textDecoration: "none"
                        }}
                        href={props.url}
                        target="_blank">
                        {props.title}
                    </a>

                </Typography>
                <Grid
                    container
                    style={{ justifyContent: "center" }}
                    spacing={2}>

                    <Grid item xs={5}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            post hacker score: {props.score}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            post by: {props.author}
                        </Typography>
                    </Grid>
                </Grid>
                <Button 
                    onClick={
                        (e)=>{setShowComments(!showComments)
                    }}
                >
                    {showComments? "Hide Comments": "Display Comments"}
                </Button>

                {showComments && comments &&
                    comments.map((comment) => {
                        return <p>{comment.data.text}</p>
                    })
                }
                
            </CardContent>
            

        </Card>)
}
