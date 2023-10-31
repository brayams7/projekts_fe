import { useEffect, useRef, useState } from "react";
import { CalendarIcon, ExpandIcon, VisibilityIcon } from "../../../../utils/icons/iconsMenu";
import dayjs from "dayjs"

import { useUpdateFeatureMutation } from "../../../../rtkQuery/apiSliceFeature";
import "./trakingFeature.css";

// import es from 'dayjs/locale/es'

dayjs.locale('es')

const TrakingFeture = ({ feature }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const debounceRef = useRef();
  const [updateFeatureRequest] = useUpdateFeatureMutation();

  const [dueDateFormat, setDueDateFormat] = useState("");
  const [dueDate, setDueDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DDTHH:mm")
  );

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  const handleChange = async (e) => {
    try {
      if (debounceRef.current) clearTimeout(debounceRef.current)

      const newDate = e.target.value;
      const timestampValue = dayjs(newDate).unix()
      console.log(timestampValue)

      const body = {
        due_date: timestampValue,
      };

      debounceRef.current = setTimeout(() => {
        updateFeatureRequest({ featureId: feature.id, body }).unwrap()
      }, 1000)

      const formatDueDate = dayjs(newDate).format("MMM. DD YYYY, HH:mm a")

      setDueDate(newDate)
      setDueDateFormat(formatDueDate)


    } catch (error) {
      console.log(error)
      setDueDate(dueDate)
      setDueDateFormat(dueDateFormat)
    }
  }

  useEffect(() => {

    if(!feature.due_date){
      setDueDate(dayjs(new Date()).format("YYYY-MM-DDTHH:mm"))
    }

    if (feature.due_date) {
      const createDate = dayjs(feature.due_date)

      setDueDateFormat(createDate.format("MMM. DD YYYY, HH:mm a"))

      setDueDate(dayjs(createDate).format("YYYY-MM-DDTHH:mm"))
    }

  }, [feature])

  return (
    <ul className="d-flex align-items-center gap-2 ist-unstyled">
      <li
        className="d-flex flex-column align-items-center ps-3"
        style={{ borderLeft: "1px solid var(--gray-600)" }}
      >
        <span>FECHA DE CREACIÓN</span>
        <span className="font_size_10_12">{feature.created_at}</span>
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
            <span className="font_size_10_12">8:00:00</span>
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

      <div
        className="d-flex flex-column justify-content-center align-items-center ps-3 due-date-feature-container"
        style={{ borderLeft: "1px solid var(--gray-600)" }}
      >
        {
          !dueDateFormat && !isCalendarOpen && (
            <button
              className="custom-icon-border-dashed d-block"
              onClick={() => toggleCalendar()}
            >
              <CalendarIcon
                fill="var(--gray-600)"
                height="36"
                width="36"
              />
            </button>
          )
        }

        {dueDateFormat && !isCalendarOpen ? (
          <>
            <span>FECHA LÍMITE</span>
            <div className="d-flex gap-2">
              <span
                className="due-date-feature--format font_size_10_12"
                role="button"
                onClick={() => toggleCalendar()}
              >
                {dueDateFormat}
              </span>
            </div>
          </>
        ) : (
          <>
            {isCalendarOpen && (
              <>
                <span>FECHA LÍMITE</span>
                <div className="d-flex align-items-center">

                  <button
                    onClick={()=>toggleCalendar()}
                  >
                    <VisibilityIcon
                      fill="var(--lightDark)"
                      height="18"
                      width="18"
                    />
                  </button>

                  <input
                    type="datetime-local"
                    placeholder="--"
                    name="dueDate"
                    id="dueDate"
                    className="form-control border-0 font_size_10_12"
                    value={dueDate}
                    onChange={handleChange}
                  />
                </div>

              </>
            )}
          </>
        )}
      </div>
    </ul>
  );
};

export default TrakingFeture;
