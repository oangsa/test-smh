// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/libs/connectMongo'
import Note from '@/models/models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getAll( req: NextApiRequest, res: NextApiResponse ) {
  if (req.method !== "GET") return res.status(405).send({message: "Only GET method is allowed!"})
  
  try {
    connectMongo()

    const check = await Note.find({})
    
    return res.status(200).send(check)

  }
  catch (err) {
    return res.status(404).send({message: "Unknown error!"})
  }

}
