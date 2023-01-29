import type { NextApiRequest, NextApiResponse } from 'next'
import pool from "@/db/pool"
import sql from "@/db/sql"
import Relate from "@/types/Relate";

export default function handler(req: NextApiRequest, res: NextApiResponse<Array<Relate>>) {
    pool(sql.queryRelate,[]).then((result:any)=>{
        if(result.length>0){
            res.send(result)
        }
        else{
            res.status(404)
        }
    })
}
