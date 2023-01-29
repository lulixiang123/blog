import type { NextApiRequest, NextApiResponse } from 'next'
import pool from "@/db/pool"
import sql from "@/db/sql"
import Collection from "@/types/Collection";

export default function handler(req: NextApiRequest, res: NextApiResponse<Collection>) {
    pool(sql.queryCollection,[]).then((result:any)=>{
        if(result.length>0){
            res.send(result)
        }
        else{
            res.status(404)
        }
    })
}
