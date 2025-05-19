import { ButtonBase, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import moment from "moment"

type DateProps = {
    date: string;
}

function Date({ date }: DateProps){
    const [type, setType] = useState<"detailed" | "fromNow">("fromNow");

    const value = useMemo(()=>{
        return type === "detailed" ? moment(date).format("MMM Do YY") : moment(date).fromNow();
    },[type])

    const handleViewType = () => {
        if(type === "detailed"){
            setType("fromNow")
        }else{
            setType("detailed")
        }
    }

    return <ButtonBase onClick={handleViewType}>{value}</ButtonBase>
}

export default Date;