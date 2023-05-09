export default async function getdata(department: string, departmentArray: any ) {
    const res = await fetch("/api/del", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({departmentArray:departmentArray, checkDepartment:department}),
    })
    
    if (res.status !== 200) return false;
    
    const arrData = await res.json()

    return arrData;
}