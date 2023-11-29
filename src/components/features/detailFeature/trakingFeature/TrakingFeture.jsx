import { useEffect, useRef, useState } from "react";
import { CalendarIcon, ExpandIcon } from "../../../../utils/icons/iconsMenu";
import dayjs from "dayjs"

import { useUpdateFeatureMutation } from "../../../../rtkQuery/apiSliceFeature";
import "./trakingFeature.css";
import CustomDatePicker from "../../../datePicker/CustomDatePicker";

// import es from 'dayjs/locale/es'

dayjs.locale('es')

const TrakingFeture = ({ feature }) => {
  // const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const debounceRef = useRef();
  const [updateFeatureRequest] = useUpdateFeatureMutation();

  // const [dueDateFormat, setDueDateFormat] = useState("")
  const [mouseIsOverDueDate,setMouseIsOverDueDate] = useState(false)
  const [timestampDueDate, setTimestampDueDate] = useState(null)
  const [dueDate, setDueDate] = useState(null)

  const handleChange = async (date) => {
    try {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      let dueDate = null
      let timestampDueDate = null

      if(date){
        dueDate = new Date(date * 1000) // pasando a milisegundos
        timestampDueDate = dayjs(dueDate).unix()
      }

      const body = {
        due_date: timestampDueDate,
        title: feature.title,
        description: feature.description,
        is_watcher: !!feature.is_watcher,
      }

      debounceRef.current = setTimeout(() => {
        updateFeatureRequest({ featureId: feature.id, body }).unwrap()
      }, 2000)

      // const formatDueDate = dayjs(newDate).format("MMM. DD YYYY, HH:mm a")

      setDueDate(dueDate)
      setTimestampDueDate(timestampDueDate)
      // setDueDateFormat(formatDueDate)


    } catch (error) {
      console.log(error)
      setDueDate(dueDate)
      setTimestampDueDate(timestampDueDate)
      // setDueDateFormat(dueDateFormat)
    }
  }

  useEffect(() => {

    if (feature.due_date) {
      setTimestampDueDate(feature.due_date)
      setDueDate(feature.due_date)
    }

  }, [feature])

  return (
    <ul className="d-flex align-items-center gap-2 ist-unstyled">
      <li
        className="d-flex flex-column align-items-center ps-3"
        style={{ borderLeft: "1px solid var(--gray-600)" }}
      >
        <span>FECHA DE CREACIÓN</span>
        <span className="fw-bold font-size-8-10">{feature.created_at}</span>
      </li>

      <div
        className="d-flex flex-column align-items-center ps-3"
        style={{ borderLeft: "1px solid var(--gray-600)" }}
      >
        <span>TIEMPO REGISTRADO</span>
        <li className="dropdown">
          <a
            href={`#recordTime`}
            type="button"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <span className="fw-bold font-size-8-10">8:00:00</span>
            <span>
              <ExpandIcon fill="var(--gray-600)" height="20" width="20" />
            </span>
          </a>
          <ul
            className="dropdown-menu p-2 custom-dropdown-card"
            id="recordTime"
          >
            <div className="font-size-14-16 font-weight-600 text-center">
              Enumerar acciones
            </div>
            <li>
              <a type="button" role="button" className="dropdown-item">
                Backlog
              </a>
            </li>
          </ul>
        </li>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center ps-3"
        // style={{transform:"translateY(2px)"}}
      >
        <span className="">FECHA LÍMITE</span>
        <div className="h-100">
          <CustomDatePicker setValue={handleChange} value={dueDate}>
            {dueDate ? (
              <div
                className="position-relative"
                onMouseEnter={() => {
                  setMouseIsOverDueDate(true);
                }}
                onMouseLeave={() => {
                  setMouseIsOverDueDate(false);
                }}
              >
                <span
                  className="text-center fw-bold font-size-8-10 title-break-all position-relative"
                  // title={dueDate}
                >
                  {dayjs
                    .unix(timestampDueDate)
                    .format("YYYY MMM. DD, HH:mm a") || "Sin fecha"}
                </span>
                {mouseIsOverDueDate && (
                  <span
                    style={{
                      top: 4,
                      fontSize: 6,
                      right: 0,
                      cursor: "pointer",
                    }}
                    className="position-absolute translate-middle badge rounded-pill bg-danger"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleChange(null)
                    }}
                  >
                    X
                  </span>
                )}
              </div>
            ) : (
              <span className="custom-icon-border-dashed d-flex align-items-center text-center">
                <CalendarIcon fill="var(--purple)" height="18" width="18" />
              </span>
            )}
          </CustomDatePicker>
        </div>
      </div>
    </ul>
  );
};

export default TrakingFeture;
