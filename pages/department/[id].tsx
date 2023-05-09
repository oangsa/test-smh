import { NextRouter, useRouter } from "next/router"
import Rate from "@/components/rate"
const DepartmentRatePage = () => {
    const router: NextRouter = useRouter()
    const {id} = router.query

    return (
        <div>
            <Rate id={id}></Rate>
        </div>
    )
}

export default DepartmentRatePage