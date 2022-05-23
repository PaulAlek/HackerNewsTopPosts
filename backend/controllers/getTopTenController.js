const db = require("../models");
const post = db.post;
const comment = db.comment;

async function getTopTenController(req, res) {
  try {
    //const hackerData = []
    const topTenPosts = await post.findAll(
      {
        limit: 10,
        order: [ [ 'createdAt', 'DESC' ]]
      }
    );
    //console.log(topTenPosts)
   
    return res.status(200).json({ message: "Working is correctly, next step is to implement the DB",
    topTenPosts
  });
  } catch (error) {
    return res.status().json(error);
  }
}

module.exports = getTopTenController;