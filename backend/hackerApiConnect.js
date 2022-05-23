const db = require("./models");
const post = db.post;
const comment = db.comment;
// const post = require('./models/post');
// const comment = require('./models/comment');

const axios = require('axios');
async function hackerApiConnect() {

    try {
        console.log("api call to hacker news");
        const topPosts = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
        const topTenPosts = await topPosts.data.slice(0, 10);

        const bulkPosts = [];
        //const bulkComments = [];
        Promise.all(
            topTenPosts.map(async (postId) => {
                    const postStory = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`);
                    // bulkPosts.push({
                    //     postIdHacker: postId,
                    //     data: postStory.data
                    // })
                    post.create({
                        postIdHacker: postId,
                        data: postStory.data
                    }).then((ret) => {
                        console.log(" posts data has been saved")
                        console.log(ret);
                    })

                    console.log(postStory.data);
                    postStory.data.kids.map(async (commentId)=>{
                        const commentPost = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
                        comment.create({
                            postIdHackerParentKey: postId,
                            data: commentPost.data
                        }).then((ret) => {
                            console.log(" comment data has been saved")
                            //console.log(ret);
                        })
                    })

            })).then(() => {
                try {
                    post.bulkCreate(bulkPosts).then((ret) => {
                        console.log(" posts data has been saved")
                        console.log(ret);
    
                    }); 
                } catch (error) {
                    console.log(error);
                }
               
            });
        }

     catch (error) {
        console.log(error);
    }
}

module.exports = hackerApiConnect;

