import dotenv from 'dotenv'

dotenv.config()

// error handling middleware
async function handdleError(err, req, res, next){

    const response = {
        message: err.message
    }

    if(process.env.NODE_ENVIRONMENT === "development"){
        response.stack = err.stack
    }
    
    // res.status(err.status).json({
    //   message: err.message,

    //   stack tells exactly where the error exists
    //   stack: err.stack, 
      // we don't send stack to show where exactly error is as it can cause problem in production by revealing our folder structure and all

    // });

    res.status(err.status).json(response)
}

export default handdleError