import type { NextApiRequest, NextApiResponse } from 'next'
import pool from "@/db/pool"
import sql from "@/db/sql"
import Blog from "@/types/Blog";


export default function handler(req: NextApiRequest, res: NextApiResponse<Blog>) {
    pool(sql.queryRecommendBlog,[]).then((result:any)=>{
        if(result.length>0){
            res.send(result)
        }
        else{
            res.status(404)
        }
    })
}
