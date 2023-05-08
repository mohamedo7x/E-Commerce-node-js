import { rateLimit } from 'express-rate-limit';


const apiLimiter = (msg , time =15 , maxLimit =5)=> {
    rateLimit({
        windowMs:time*60*1000,
        max:maxLimit,
        message:msg
    })
}

export default apiLimiter;