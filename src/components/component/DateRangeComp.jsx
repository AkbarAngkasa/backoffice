import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const DateRangeComp = ({fromChild, listener}) => {

    // date state
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: moment().add(7, 'd')._d,
            key: 'selection'
        }
    ])

    const [isDate, setIsDate] = useState(false);

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
        if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    const startDate = useRef("");
    const endDate = useRef("");

    const dateValueHandler = (item) => {
        const startDateInput = startDate.current = item.selection.startDate;
        const endDateInput = endDate.current = item.selection.endDate;

        let date = {
            startDateInput,
            endDateInput
        }

        // Send data from child component (this component) to parent component.
        fromChild(date)
    }

    const clearDateHandler = (e) => {
        e.preventDefault();
        // UI
        setIsDate(false);
        // Data
        const startDateInput = startDate.current = "";
        const endDateInput = endDate.current = "";

        let date = {
            startDateInput,
            endDateInput
        }

        // Send data from child component (this component) to parent component.
        fromChild(date)
    }

    return (
        <>
            <div className="relative">
                <input
                    id="date-range-input"
                    value={
                        isDate ?
                        `${moment(range[0].startDate).format('DD MMMM YYYY')} - ${moment(range[0].endDate).format('DD MMMM YYYY')}`
                        :
                        ""
                    }
                    readOnly
                    className="w-full px-4 inline-block py-2.5 text-sm font-medium text-gray-900 border border-slate-400 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Select Date"
                    onClick={() => {
                        setOpen(open => !open)
                    }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FontAwesomeIcon 
                        icon={faXmark} 
                        onClick={(e) => {
                            clearDateHandler(e) 
                            listener()
                        }} 
                        className="text-slate-500 cursor-pointer z-40"
                    />
                </div>
            </div>

            <div ref={refOne}>
                {open &&
                    <DateRange
                        onChange={item => {
                            // Data
                            dateValueHandler(item)
                            // UI
                            setRange([item.selection])
                            setIsDate(true)
                            listener()
                        }}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction="horizontal"
                        className="calendarElement absolute z-50"
                    />
                }
            </div>
        </>
    )
}

export default DateRangeComp