
export function logger(req,res,next){
    console.log(`URL:`+req.url)
    next()
}