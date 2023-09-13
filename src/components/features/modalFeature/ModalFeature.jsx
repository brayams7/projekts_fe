import { useState } from "react";
import './modalFeature.css'
import DetailFeature from "../detailFeature/DetailFeature";

const DETAIL = "Detalles"
const ACTIVITY = "Actividad"

const OPTIONS_MENU_MODAL = [DETAIL, ACTIVITY]


const ModalFeature = ({selectedFeature}) => {

  const [optionSelected, setOptionSelected] = useState(DETAIL)

  return (
    <div
        className="modal fade"
        id="modalBoard"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          {/* <ModalMoreTopics/> */}
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                <button
                  id="modalClose"
                  type="button"

                  className="btn-close eliminarModal ms-auto"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              {
                selectedFeature && (
                  <div className="d-block d-xl-none">
                    <ul className="menu-modal-feature-mobile list-unstyled menu d-flex justify-content-center gap-2">
                      {
                        OPTIONS_MENU_MODAL.map(item=>(
                          <li
                            key={item}
                            className={ "px-2 py-1 rounded-4 shadow bg-body-tertiary"

                            }
                          >
                            <a
                              role="button"
                              type="button"
                              className={item.toUpperCase() === optionSelected.toUpperCase() ? "active" : ""}
                              onClick={()=>setOptionSelected(item)}
                            >
                              {item}
                            </a>
                          </li>
                        ))
                      }
                    </ul>

                    {
                      optionSelected.toUpperCase() === DETAIL.toUpperCase() && (
                        <DetailFeature/>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
  );
};


export default ModalFeature;
