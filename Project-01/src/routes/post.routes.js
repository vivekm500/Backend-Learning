const express  = require("express")

const postRouter = express.Router()

const postController = require("../controllers/post.controllers")

const multer = require("multer") // to read form-data

const upload = multer({ storage:multer.memoryStorage() }) // setting storage location to memory-storage(RAM temprorary)

/**
 * POST - '/api/posts'  (protected) // jis user ke pass valid token hoga sirf wohi iss api pe request kar sakta hai parna bol d enge unauthorised access(access denied)
 * req.body = {caption, image-file}
 */

postRouter.post("/", upload.single("image"), postController.createPostController)

module.exports = postRouter