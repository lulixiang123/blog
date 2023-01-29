import type { NextApiRequest, NextApiResponse } from 'next'
import pool from "@/db/pool"
import sql from "@/db/sql"
import Dictum from "@/types/Dictum";

export default function handler(req: NextApiRequest, res: NextApiResponse<Dictum>) {
    pool(sql.queryRandomDictum,[]).then((result:any)=>{
        if(result.length>0){
            res.send(result)
        }
        else{
            res.status(404)
        }
    })
}
