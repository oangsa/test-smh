// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/libs/connectMongo'
import Note from '@/models/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import arrayRemove from '@/libs/arrayRemove'
import cookie from 'cookie'
import { setCookie } from 'cookies-next';
import { NextResponse } from 'next/server'
import checkData from '@/libs/checkData'
import forReal from '@/libs/forReal'

export default async function report( req: NextApiRequest, res: NextApiResponse ) {
  if (req.method !== "POST") return res.status(405).send({message: "Only POST method is allowed!"})
  var { sendDepartment, score, advice, department } = req.body
  if (department === "คลินิกสูตินรีเวช - เด็ก"){
    var department = department.replace(" ", "_")
    var department = department.replace("-", "")
    var department = department.replace(" ", "")
  }
  else if (department === "แผนกอุบัติเหตุ - ฉุกเฉิน"){
    var department = department.replace(" ", "_")
    var department = department.replace("-", "")
    var department = department.replace(" ", "")
  }
  else {
    var department = department.replace(" ", "_")
    var department = department.replace(" ", "_")
  }

  // const dd = {
  //   แผนกห้องผ่าตัด: "opd", 
  //   แผนกผู้ป่วยวิกฤต: "icu", 
  //   แผนกผู้ป่วยใน_4_วังฯ: "fourwang", 
  //   แผนกผู้ป่วยใน_5_วังฯ: "fivewang", 
  //   แผนกผู้ป่วยใน_6_วังฯ: "sixwang", 
  //   แผนกผู้ป่วยใน_7_วังฯ: "sevenwang", 
  //   แผนกผู้ป่วยใน_8_วังฯ: "eightwang", 
  //   แผนกผู้ป่วยใน_4_มารีย์: "fourmarie", 
  //   แผนกผู้ป่วยใน_5_มารีย์: "fivemarie", 
  //   แผนกผู้ป่วยใน_6_มารีย์: "sixmarie", 
  //   คลินิกอายุรกรรม: "med", 
  //   คลินิกศัลยกรรม: "sur", 
  //   คลินิกสูตินรีเวช_เด็ก: "baby", 
  //   แผนกอุบัติเหตุ_ฉุกเฉิน: "emer", 
  //   คลินิกเฉพาะทาง: "exclu", 
  //   บริการเปล: "prey"
  // }
  
  try {
    connectMongo()

    const check = await Note.findOne({department: forReal(department)})

    if (check === null) {
      const struct = {
        department: forReal(department),
        score: score,
        arrayDepartment: [sendDepartment],
        arrayAdvice: [advice === "" ? "" : advice === "ไม่มี" ? "" : advice === "-" ? "" : advice]
      }
      if(struct.arrayAdvice.includes("")) struct.arrayAdvice = arrayRemove(struct.arrayAdvice, "")

      Note.create(struct)

    }
    else {
      check.arrayDepartment.push(sendDepartment)
      const arrAdvice = arrayRemove(check.arrayAdvice, "", advice)
      console.log(arrAdvice)
      await Note.updateOne({department: forReal(department)}, { $set: { score: check.score+score, arrayDepartment: check.arrayDepartment, arrayAdvice: arrAdvice }})
    }
    

    res.setHeader('Set-Cookie', cookie.serialize(checkData(department), "true" , {
      path: '/',
      httpOnly: false,
      sameSite: "strict"
    }))
    

    return res.status(200).send({ message: true })

  }
  catch (err) {
    return res.status(404).send({message: "Unknown error!"})
  }

}
