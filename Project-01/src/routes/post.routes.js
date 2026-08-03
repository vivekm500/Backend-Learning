const express  = require("express")

const postRouter = express.Router()

const postController = require("../controllers/post.controllers")

const multer = require("multer") // to read form-data
const authRouter = require("./auth.routes")

// identifyUser middleware
const identifyUser = require("../middleware/auth.middleware")

const upload = multer({ storage:multer.memoryStorage() }) // setting storage location to memory-storage(RAM temprorary)

/**
 * POST - '/api/posts'  (protected) // jis user ke pass valid token hoga sirf wohi iss api pe request kar sakta hai parna bol d enge unauthorised access(access denied)
 * req.body = {caption, image-file}
 */

postRouter.post("/", upload.single("image"), identifyUser,  postController.createPostController)


/**
 * GET - 'api/posts'  (protected)
 */

postRouter.get("/", identifyUser, postController.getPostController)



/**
 * GET - /api/posts/details/:postId
 * returns detail about specific post with its id. also checks the post belons to the user that the request come from
 */

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

module.exports = postRouter