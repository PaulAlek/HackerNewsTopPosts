const db = require("../models");
const post = db.post;
const comment = db.comment;

async function getCommentController(req, res) {
  try {
      const parentId = req.params.id;
    const allComments = await comment.findAll(
      {
        where:{
            postIdHackerParentKey: parentId
        },
        order: [ [ 'createdAt', 'DESC' ]]
      }
    );
    //console.log(topTenPosts)
   
    return res.status(200).json({ message: "All the comments for a particular post",
    allComments
  });
  } catch (error) {
    return res.status().json(error);
  }
}

module.exports = getCommentController;