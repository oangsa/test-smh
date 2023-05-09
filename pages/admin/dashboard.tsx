import { useEffect, useState } from "react"
import StatModal from "@/components/modal"
// import { useExcelDownloder } from "react-xls"

const AdminDashboard = () => {

    const Data = {
        Data1: [
          { name: 'gfg1', category: 'gfg4' },
          { name: 'gfg2', category: 'gfg5' },
          { name: 'gfg3', category: 'gfg6' },
        ],
        // Worksheet named pokemons
        Data2: [
          { name: 'gfg1', category: 'gfg1' },
          { name: 'gfg1', category: 'gfg1' },
          { name: 'gfg1', category: 'gfg1' },
        ],
    };
    const [data, setData] = useState([])
    const [showStudent, setShowStudent] = useState(true)
    const [downloadData, setDownloadData] = useState({Data:[]})
    // const { ExcelDownloder, Type } = useExcelDownloder();

    

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/getall")
            const resData = await res.json()
            setData(resData)
        }
        // const appendData = async () => {
        //     data.map((element:string) => {
        //         const struct: any = {"แผนก": element.department, "คะแนนรวม": element.score}
        //         downloadData.Data.push(struct)
        //     })
        // }
        getData()
        // appendData()
    }, [data, downloadData.Data])

    const OnClick = () => {
        data.map((element:any) => {
            const struct: any = {"แผนก": element.department, "คะแนนรวม": element.score}
            downloadData.Data.push(struct)
        })

        console.log(Data)
    }
    

    return (
        <>
            <div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 block sm:flex items-center justify-between border-b border-gray-200">
                    <div className="mb-1 w-full">
                        <div className="mb-4">
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white underline">สรุปข้อมูล</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                        {/* <ExcelDownloder className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" data={downloadData} filename={'Data'} type={'button'}/> */}
                        <button onClick={OnClick} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Download
                        </button>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-16 md:m-8">
                    {showStudent === true ? (
                        <>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3" >แผนก</th>
                                        <th scope="col" className="px-6 py-3" >คะแนนรวม</th>              
                                        <th scope="col" className="px-6 py-3" >แผนกที่ยังไม่ได้ประเมิน</th>              
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((element:any) => 
                                    <tr key={element._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{element.department}</th>
                                        <td className="px-7 py-4" >{element.score} คะแนน</td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <StatModal key={element._id} id={element.department}></StatModal>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </> 
                    ) : (
                        <p>None of data!</p>
                    )}     
                </div>
            </div>
        </>
    )
}

export default AdminDashboard