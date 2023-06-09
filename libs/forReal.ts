const forReal = (depar:string) => {
    const data = depar === "แผนกผู้ป่วยใน_4_วังฯ" ? "แผนกผู้ป่วยใน 4 วังฯ"
        : depar === "แผนกผู้ป่วยใน_5_วังฯ" ? "แผนกผู้ป่วยใน 5 วังฯ"
        : depar === "แผนกผู้ป่วยใน_6_วังฯ" ? "แผนกผู้ป่วยใน 6 วังฯ"
        : depar === "แผนกผู้ป่วยใน_7_วังฯ" ? "แผนกผู้ป่วยใน 7 วังฯ"
        : depar === "แผนกผู้ป่วยใน_8_วังฯ" ? "แผนกผู้ป่วยใน 8 วังฯ"
        : depar === "แผนกผู้ป่วยใน_4_มารีย์" ? "แผนกผู้ป่วยใน 4 มารีย์"
        : depar === "แผนกผู้ป่วยใน_5_มารีย์" ? "แผนกผู้ป่วยใน 5 มารีย์"
        : depar === "แผนกผู้ป่วยใน_6_มารีย์" ? "แผนกผู้ป่วยใน 6 มารีย์"
        : depar === "คลินิกสูตินรีเวช_เด็ก" ? "คลินิกสูตินรีเวช - เด็ก"
        : depar === "แผนกอุบัติเหตุ_ฉุกเฉิน" ? "แผนกอุบัติเหตุ - ฉุกเฉิน"
        : depar;
    return data
}

export default forReal