import { useState } from "react"
import RateModal from "@/components/modal"
import { NextRouter, useRouter } from "next/router"
import List from "@/components/list"
interface departmentProvider {
  department: string
}

export default function Home() {
  const router: NextRouter = useRouter()

  const [department, setDepartment] = useState<departmentProvider[]>([
    {department: "แผนกห้องผ่าตัด"}, 
    {department: "แผนกผู้ป่วยวิกฤต"}, 
    {department: "แผนกผู้ป่วยใน 4 วังฯ"}, 
    {department: "แผนกผู้ป่วยใน 5 วังฯ"}, 
    {department: "แผนกผู้ป่วยใน 6 วังฯ"}, 
    {department: "แผนกผู้ป่วยใน 7 วังฯ"}, 
    {department: "แผนกผู้ป่วยใน 8 วังฯ"}, 
    {department: "แผนกผู้ป่วยใน 4 มารีย์"}, 
    {department: "แผนกผู้ป่วยใน 5 มารีย์"}, 
    {department: "แผนกผู้ป่วยใน 6 มารีย์"}, 
    {department: "คลินิกอายุรกรรม"}, 
    {department: "คลินิกศัลยกรรม"}, 
    {department: "คลินิกสูตินรีเวช - เด็ก"}, 
    {department: "แผนกอุบัติเหตุ - ฉุกเฉิน"}, 
    {department: "คลินิกเฉพาะทาง"}, 
    {department: "บริการเปล"}
  ])

  const showList = true

  return (
    <>
      <div className="font-bold text-3xl underline mb-3 mt-3 text-center ">
        ประเมิน SMMD 66
      </div>      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-16 md:m-8">
        {showList === true ? (
            <>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3" >รายชื่อแผนก</th>
                            <th scope="col" className="px-6 py-3" >ประเมิน</th>              
                        </tr>
                    </thead>
                    <tbody>
                      {department.map((element) => (
                        <List OnClick={() => router.push(`department/${element.department}`)} department={element.department} key={element.department}/> 
                      ))}
                    </tbody>
                </table>
            </> 
        ) : (
            <p>None of student!</p>
        )}     
      </div>
    </>
  )
}
