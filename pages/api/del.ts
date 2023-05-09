// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/libs/connectMongo'
import Note from '@/models/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import arrayRemove from '@/libs/arrayRemove'

export default async function del( req: NextApiRequest, res: NextApiResponse ) {
    if (req.method !== "POST") return res.status(405).send({message: "Only POST method is allowed!"})
  
    const { departmentArray, checkDepartment } = req.body

    try {
        
        var newArray:any[] = []
        connectMongo()

        const check = await Note.findOne({department: checkDepartment})
        
        console.log(check, newArray)

        if (check === null) return res.status(200).send(departmentArray)
        
        await departmentArray.map( async (element:string) => {
            if (!check.arrayDepartment.includes(element)) newArray.push(element)
        })
        // console.log(newArray)
        return res.status(200).send(newArray)

    }
    catch (err) {
        return res.status(404).send({message: "Unknown error!"})
    }

}
