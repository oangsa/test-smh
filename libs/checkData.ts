import forReal from "./forReal";

const checkData = (depar:string) => {
    const data = depar === "แผนกห้องผ่าตัด" ? "opd"
        : depar === "แผนกผู้ป่วยวิกฤต" ? "icu"
        : depar === "แผนกผู้ป่วยใน_4_วังฯ" ? "fourwang"
        : depar === "แผนกผู้ป่วยใน_5_วังฯ" ? "fivewang"
        : depar === "แผนกผู้ป่วยใน_6_วังฯ" ? "sixwang"
        : depar === "แผนกผู้ป่วยใน_7_วังฯ" ? "sevenwang"
        : depar === "แผนกผู้ป่วยใน_8_วังฯ" ? "eightwang"
        : depar === "แผนกผู้ป่วยใน_4_มารีย์" ? "fourmarie"
        : depar === "แผนกผู้ป่วยใน_5_มารีย์" ? "fivemarie"
        : depar === "แผนกผู้ป่วยใน_6_มารีย์" ? "sixmarie"
        : depar === "คลินิกอายุรกรรม" ? "med"
        : depar === "คลินิกศัลยกรรม" ? "sur"
        : depar === "คลินิกสูตินรีเวช_เด็ก" ? "baby"
        : depar === "แผนกอุบัติเหตุ_ฉุกเฉิน" ? "emer"
        : depar === "คลินิกเฉพาะทาง" ? "exclu"
        : depar === "บริการเปล" ? "prey"
        : "";
    return data
}

export default checkData;