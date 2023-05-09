// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function Linehandler(req: NextApiRequest,res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).send({message: "Only POST method is allowed!"})
    const { department, sendDepartment, score } = req.body
    
    try {
        const token = 'AN7ICSRiSvVMuSZlI9BCF9IHU6RPyqPEhzYAoBltG8C';
        const msg = `message=\n${department} ได้ประเมิน${sendDepartment}แล้ว\nคะแนน ${score}`;
        const data = "message=%22HEllo%22";

        const response = await fetch("https://notify-api.line.me/api/notify", {
            mode: "cors",
            method: 'POST',
            headers: {
                'Authorization': 'Bearer AN7ICSRiSvVMuSZlI9BCF9IHU6RPyqPEhzYAoBltG8C',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: msg,
        });

        const text = await response.text();

        console.log(text);
        return res.status(200).send({})
    }
    catch (err) {

    }
}
