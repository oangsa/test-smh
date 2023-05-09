import { useCookies } from 'react-cookie';
import { hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import checkData from "../libs/checkData"

const List = ({department, OnClick}:any) => {
    const [has, setHas] = useState(true)
    useEffect(() => {
        var depar = department
        if (depar === "คลินิกสูตินรีเวช - เด็ก"){
            var depar = depar.replace(" ", "_")
            var depar = depar.replace("-", "")
            var depar = depar.replace(" ", "")
        }
        else if (depar === "แผนกอุบัติเหตุ - ฉุกเฉิน"){
            var depar = depar.replace(" ", "_")
            var depar = depar.replace("-", "")
            var depar = depar.replace(" ", "")
        }
        else {
            var depar = depar.replace(" ", "_")
            var depar = depar.replace(" ", "_")
        }
        const data = checkData(depar)
        setHas(hasCookie(data))
    }, [department])

    return (
        has === false ? 
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{department}</th>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button onClick={OnClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ประเมิน</button>
                </td>
            </tr>  
        : <></>
    )
}

export default List

// onClick={() => router.push(`department/${department}`)}