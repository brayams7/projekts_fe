import { useRef, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePicker.css";

import es from "date-fns/locale/es";
registerLocale("es", es);

const CustomDatePicker = ({ children, setValue }) => {
  const defaultTime = new Date()
  defaultTime.setHours(10,0,0)

  const [date, setDate] = useState(defaultTime)
  const [isOpen, setIsOpen] = useState(false)


  const datePickerRef = useRef()

  const handleChange = (date) => {
    setIsOpen(!isOpen)
    setDate(date)
    const dateObject = new Date(date)
    // const timesTamp = Math.floor(dateObject.getTime() / 1000)
    setValue(dateObject)
  }

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   setIsOpen(!isOpen)
  // }

  const showDatePicker = () => {
    setIsOpen(!isOpen)
    datePickerRef.current.setOpen(true)
  }

  // const handleColor = (time) => {
  //   return time.getHours() > 12 ? "text-success" : "text-error";
  // }

  return (
    <>
      <button className="example-custom-input" onClick={showDatePicker}>
        {children}
      </button>
      <ReactDatePicker
        locale={"es"}
        showTimeSelect
        selected={date}
        onChange={handleChange}
        minTime={new Date().setHours(8, 0, 0)} // Establece 8:00 AM como el tiempo mínimo
        maxTime={new Date().setHours(23, 0, 0)} // Establece 11:00 PM como el tiempo máximo
        // timeClassName={handleColor}
        dateFormat="MMMM d, yyyy h:mm aa"
        showPopperArrow={false}
        customInput={<div style={{ display: "none" }}></div>}
        ref={datePickerRef}
        shouldCloseOnSelect={false}
        timeInputLabel="Hora"

        // timeFormat="HH:mm"
        // inline
      />
    </>
  );
};

export default CustomDatePicker;
