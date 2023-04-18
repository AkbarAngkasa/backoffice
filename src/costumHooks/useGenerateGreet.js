import moment from "moment/moment";
import { useState } from "react"

export default function useGenerateGreet() {
    
    const [currentGreet, setCurrentGreet] = useState("Hello");
    
    setInterval(() => {
        let currentHour = moment().format("HH");
        if (currentHour >= 3 && currentHour < 12){
            return setCurrentGreet("Good morning");
        } else if (currentHour >= 12 && currentHour < 15){
            return setCurrentGreet("Good evening");
        }   else if (currentHour >= 15 && currentHour < 20){
            return setCurrentGreet("Good afternoon");
        } else if (currentHour >= 20 || currentHour < 3){
            return setCurrentGreet("Good night");
        } else {
            return "Halo"
        } 
    }, 1000);

    return currentGreet
}
