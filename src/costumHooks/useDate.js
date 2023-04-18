import moment from "moment";
import { useState } from "react";

export default function useDate() {
    const [date, setDate] = useState(moment().format('h:mm a'));

    setInterval(() => {
        return setDate(moment().format('h:mm a'));
    }, 1000)

    return date
}
