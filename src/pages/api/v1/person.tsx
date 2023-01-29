import type { NextApiRequest, NextApiResponse } from 'next'
import pool from "@/db/pool"
import sql from "@/db/sql"
import PersonInfo from "@/types/PersonInfo";

export default async function handler(req: NextApiRequest, res: NextApiResponse<PersonInfo>) {

    const setPerson=await pool(sql.queryFontCount,[]).then((result:any)=>{
        if(result.length>0){
            console.log(result[0].fontCount)
        }
        else{
            res.status(404)
        }
    })

    const person=await pool(sql.queryPersonInfo,[]).then((result:any)=>{
        if(result.length>0){
            res.send({
                nickname: result[0].nickname,
                avatarUrl: result[0].avatarUrl,
                personalPosition: result[0].personalPosition,
                introduce: result[0].introduce,
                blogCount: result[0].blogCount,
                fontCount: result[0].fontCount
            })
        }
        else{
            res.status(404)
        }
    })


}
