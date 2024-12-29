import axios from 'axios'


const commonApi=(reqMethod,reqBody,reqUrl,reqHeader)=>{
    const config={
        url:reqUrl,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"},
        method:reqMethod,
        data:reqBody
    }
    return axios(config)
}
export default commonApi
