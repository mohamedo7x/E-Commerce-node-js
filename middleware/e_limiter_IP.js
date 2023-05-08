import { rateLimit } from 'express-rate-limit';


const limiter = rateLimit({
    windowMs:1*60*1000, // 15min
    max:100 ,//100 req
    message : "Request limit exceeded. Try again later."
})

export default limiter;