import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'


const DateRangeComp = ({ inputClass }) => {

    // date state
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: moment().add(7, 'd')._d,
            key: 'selection'
        }
    ])

    // open close
    const [open, setOpen] = useState(false)

    // get the target element to toggle 
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        // console.log(e.key)
        if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        // console.log(refOne.current)
        // console.log(e.target)
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    const dateValueHandler = () => {
        console.log("date value")
    }

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faCalendar} className='text-slate-500' />
            </div>
            <input
                value={
                    `${moment(range[0].startDate).format('DD MMMM YYYY')} - ${moment(range[0].endDate).format('DD MMMM YYYY')}`
                }
                readOnly
                className={inputClass}
                onClick={() => {
                    setOpen(open => !open)
                }}
                type="text"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FontAwesomeIcon icon={faDeleteLeft} className='text-slate-500' />
            </div>

            <div ref={refOne} className="w-full relative">
                {open &&
                    <DateRange
                        onChange={item => {
                            setRange([item.selection])
                            dateValueHandler()
                        }}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction="horizontal"
                        className="absolute z-50"
                    />
                }
            </div>
        </div>
    )
}

export default DateRangeComp