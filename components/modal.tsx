import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const StatModal = ({id, key}: any) => {
    const router: NextRouter = useRouter()

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

    const modalOptions: ModalOptions = {
        placement: 'center'
    }

    const onClose = () => {
        try{
            const $modalElement: HTMLElement = document.querySelector('#defaultModal');
            const modal: ModalInterface = new Modal($modalElement, modalOptions);

            setTimeout(() => router.reload(), 500)
        }
        catch (err) {
            console.log(err)
        }
    }
    
    const onOpen = () => {
        try{
            const $modalElement: HTMLElement = document.querySelector('#defaultModal');
            const modal: ModalInterface = new Modal($modalElement, modalOptions);

            modal.show()
        }
        catch (err) {
            console.log(err)
        }
    }

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

    return (
        <div>
            <div>
                <button onClick={onOpen} id="defaultModalButton" data-modal-toggle="defaultModal" type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    กดเลย
                </button>
            </div>
            
            <div id="defaultModal" data-modal-backdrop="static"  aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                รายชื่อแผนกที่ยังไม่ได้ประเมิน {id}
                            </h3>
                            <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                            </button>
                        </div>
                        <div className="grid sm:grid-col-2 p-6 space-y-2">
                            { department.map((element) => (
                                <div key={element} className='font-bold text-lg text-black' id={element}>{element}</div>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatModal