export async function registerUser(req, rers, next){
    try{
    throw new Error("user already exists, with same email");
    }catch(err){
        err.status = 409 // we can send custom status to shown by handleError middleware
        next(err)
    }
    
}