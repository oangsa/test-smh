import getdata from '@/libs/getData'
import { NextRouter, useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import queryString from 'query-string';
import lineApi from 'line-api'

interface checkboxState {
    "first-col-1-alt":boolean
    "sec-col-1-alt":boolean
    "th-col-1-alt":boolean
    "four-col-1-alt":boolean
    "five-col-1-alt":boolean
    "first-col-2-alt":boolean
    "sec-col-2-alt":boolean
    "th-col-2-alt":boolean
    "four-col-2-alt":boolean
    "five-col-2-alt":boolean
}

const Rate = ({id}:any) => {
    const router: NextRouter = useRouter()
    const [score, setScore] = useState<number>(0)
    const [stateScore, setStateScore] = useState({
        "first-col-1-alt":true,
        "sec-col-1-alt":true,
        "th-col-1-alt":true,
        "four-col-1-alt":true,
        "five-col-1-alt":true,
        "first-col-2-alt":true,
        "sec-col-2-alt":true,
        "th-col-2-alt":true,
        "four-col-2-alt":true,
        "five-col-2-alt":true
    })
    const [getDepartment, setGetDepartment] = useState<string>("เลือกแผนก")
    const [advice, setAdvice] = useState<string>("")
    const [department, setDepartment] = useState([
        "ผู้ตรวจการ",
        "ศูนย์คุณภาพ",
        "แผนกประชาสัมพันธ์และการตลาด",
        "แผนกสิทธิประโยชน์",
        "แผนกโทรศัพท์",
        "แผนกห้องปฎิบัติการ",
        "แผนกรังสีวิทยา",
        "แผนกเภสัชกรรม",
        "แผนกการเงิน",
        "แผนกลูกค้าสัมพันธ์",
        "แผนกจัดซื้อและคลัง",
        "แผนกจ่ายกลาง",
        "แผนกอภิบาล",
        "แผนกกายภาพบำบัด",
    ])

    
    
    useEffect(() => {
        const Department = [
            "ผู้ตรวจการ",
            "ศูนย์คุณภาพ",
            "แผนกประชาสัมพันธ์และการตลาด",
            "แผนกสิทธิประโยชน์",
            "แผนกโทรศัพท์",
            "แผนกห้องปฎิบัติการ",
            "แผนกรังสีวิทยา",
            "แผนกเภสัชกรรม",
            "แผนกการเงิน",
            "แผนกลูกค้าสัมพันธ์",
            "แผนกจัดซื้อและคลัง",
            "แผนกจ่ายกลาง",
            "แผนกอภิบาล",
            "แผนกกายภาพบำบัด",
        ]
        const checkData = async () => {
            const res = await fetch("/api/del", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({departmentArray:Department, checkDepartment:id}),
            })
            
            if (res.status !== 200) return false;
            
            const arrData = await res.json()
            setDepartment(arrData)
        }
        checkData()
    }, [id])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target
        var val:number = parseInt(value)
        if (name.includes("-alt")) {
            setStateScore((prev) => ({...prev, [name]: checked}))
        } else {
            setStateScore((prev) => ({...prev, [name+"-alt"]: !checked}))
        }
        if (!checked && name.includes("-alt") || checked && !name.includes("-alt")) return setScore( score + val )
        setScore( score - val )
    }

    const postData = async () => {
        console.log(getDepartment, id, score, advice)
        const res = await fetch("/api/sendData", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({sendDepartment: getDepartment, department: id, score: score, advice: advice}),
        })
        
        if (res.status !== 200) return false;
        
        return true
    }

    const postLine = async () => {
        const url = '/api/sendLinehandler';
        const response = await fetch(url, {
            mode: "cors",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({department:getDepartment, sendDepartment:id, score: score}),
        });

        const text = await response.text();

        console.log(text);
    }

    const swalSuccess = () => {
        
        Swal.fire({
            title: 'สำเร็จ!',
            icon: "success",
        })

        setTimeout(() => router.push('/'), 1500)
    }
    
    const swalError = () => {
        
        Swal.fire({
            title: 'Unexpected Error!',
            icon: "error",
        })

        setTimeout(() => router.reload(), 1500)
    }

    const onSubmit = async () => {
        Swal.fire({
            title: 'ต้องการส่งคำตอบไหม?',
            text: "ไม่สามารถส่งอีกครั้งได้แล้วนะ!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'บันทึก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (!await postData()) return swalError() 
                swalSuccess()
                postLine()
            }
        })

        console.log(score ,getDepartment, advice)
    }

    return (
        <div>
            <div className="overflow-y-auto top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 md:h-full">
                <div className="relative p-8 w-full h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                ประเมิน {id}
                            </h3>
                        </div>
                        <form action="#">
                            <div className="gap-4 mb-4 sm:grid-cols-1">
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">แผนก</label>
                                    <select onChange={(e) => setGetDepartment(e.currentTarget.value)} defaultValue={getDepartment} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option disabled>เลือกแผนก</option>
                                        {department.length > 0 && department.map((element:string) => (
                                            <option key={element} value={element}>{element}</option>
                                        ))}
                                    </select>
                                </div>
                                <div></div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-8 md:m-8">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3" >1. การปฏิบัติตามหลักยิ้มรับ ( 2 คะแนน )</th>
                                                <th scope="col" className="px-6 py-3" >ประเมิน</th>              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >สีหน้ายิ้มแย้มอยู่เสมอเมื่อพบผู้รับบริการ ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['first-col-1-alt']} onChange={handleChange} name='first-col-1' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="first-col-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['first-col-1-alt']} onChange={handleChange} name='first-col-1-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="first-col-1-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >สีหน้ายิ้มแย้มอยู่เสมอเมื่อพบพนักงานภายนอกแผนก ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['first-col-2-alt']} onChange={handleChange} name='first-col-2' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="first-col-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['first-col-2-alt']} onChange={handleChange} name='first-col-2-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="first-col-2-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-8 md:m-8">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3" >2. การปฏิบัติตามหลักทักทาย ( 2 คะแนน )</th>
                                                <th scope="col" className="px-6 py-3" >ประเมิน</th>              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >ไหว้และกล่าวทักทายผู้รับบริการอย่างเหมาะสม ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['sec-col-1-alt']} onChange={handleChange} name='sec-col-1' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="sec-col-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['sec-col-1-alt']} onChange={handleChange} name='sec-col-1-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="sec-col-1-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >ไหว้และกล่าวทักทายพนักงานภายนอกแผนกอย่างสม่ำเสมอ ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['sec-col-2-alt']} onChange={handleChange} name='sec-col-2' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="sec-col-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['sec-col-2-alt']} onChange={handleChange} name='sec-col-2-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="sec-col-2-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-8 md:m-8">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3" >3. การปฏิบัติตามหลักใส่ใจสอบถาม ( 2 คะแนน )</th>
                                                <th scope="col" className="px-6 py-3" >ประเมิน</th>              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >ใส่ใจสอบถามผู้รับบริการอย่างสม่ำเสมอ ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['th-col-1-alt']} onChange={handleChange} name='th-col-1' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="th-col-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['th-col-1-alt']} onChange={handleChange} name='th-col-1-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="th-col-1-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >ใส่ใจสอบถามพนักงานภายนอกแผนกด้วยปิยวาจาอย่างสม่ำเสมอ ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['th-col-2-alt']} onChange={handleChange} name='th-col-2' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="th-col-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['th-col-2-alt']} onChange={handleChange} name='th-col-2-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="th-col-2-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-8 md:m-8">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3" >4. การปฏิบัติตามหลักแม่นยำข้อมูล ( 2 คะแนน )</th>
                                                <th scope="col" className="px-6 py-3" >ประเมิน</th>              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >ให้ข้อมูลผู้รับบริการอย่างถูกต้องและเหมาะสม ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['four-col-1-alt']} onChange={handleChange} name='four-col-1' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="four-col-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['four-col-1-alt']} onChange={handleChange} name='four-col-1-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="four-col-1-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >ให้ข้อมูลพนักงานภายนอกแผนกได้อย่างถูกต้องและเหมาะสม ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['four-col-2-alt']} onChange={handleChange} name='four-col-2' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="four-col-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['four-col-2-alt']} onChange={handleChange} name='four-col-2-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="four-col-2-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:m-8 md:m-8">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3" >5. การปฏิบัติตามหลักธุระใช่  ( 2 คะแนน )</th>
                                                <th scope="col" className="px-6 py-3" >ประเมิน</th>              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >มีความกระตือรือร้นและธุระใช่กับผู้รับบริการอย่างถูกต้องและเหมาะสม ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['five-col-1-alt']} onChange={handleChange} name='five-col-1' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="five-col-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['five-col-1-alt']} onChange={handleChange} name='five-col-1-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="five-col-1-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >มีความกระตือรือร้นและธุระใช่กับผู้รับบริการอย่างถูกต้องและเหมาะสม ( 1 คะแนน )</th>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <div className="flex items-center mb-4">
                                                        <input checked={!stateScore['five-col-2-alt']} onChange={handleChange} name='five-col-2' id="default-checkbox" type="checkbox" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="five-col-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1 คะแนน</label>
                                                        <input checked={stateScore['five-col-2-alt']} onChange={handleChange} name='five-col-2-alt' id="default-checkbox" type="checkbox" value={1} className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="five-col-2-alt" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 คะแนน</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ข้อเสนอแนะ</label>
                                    <textarea onChange={(e) => setAdvice(e.target.value)} value={advice} id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Cheesecake..."></textarea>                    
                                </div>
                            </div>
                        </form>
                        <button onClick={onSubmit} className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rate;