import { useState } from "react";
import "./modalFeature.css";
import DetailFeature from "../detailFeature/DetailFeature";
import Activity from "../activity/Activity";
import { useGetDetailFeatureQuery } from "../../../rtkQuery/apiSliceFeature";
import { DetailFeatureLoader } from "../../utilsComponents/MySkeleton";
import { useWindowsSize } from "../../../hooks/useWindowsResize";

const DETAIL = "Detalles";
const ACTIVITY = "Actividad";

const OPTIONS_MENU_MODAL = [DETAIL, ACTIVITY];

const ModalFeature = ({ selectedFeature }) => {
  const [optionSelected, setOptionSelected] = useState(DETAIL);

  const { data, isFetching, isLoading } = useGetDetailFeatureQuery(
    selectedFeature?.id
  );
  const { width } = useWindowsSize();
  //if (isError) console.log("error");

  return (
    <div
      className="modal fade"
      // style={{}}
      id="modalFeature"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        {/* <ModalMoreTopics/> */}
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="d-flex justify-content-between p-3 pb-0">
              <button
                id="modalClose"
                type="button"
                className="btn-close eliminarModal ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {selectedFeature &&
              (width < 1200 ? (
                <div className="d-block d-xl-none">
                  <ul className="menu-modal-feature-mobile list-unstyled menu d-flex justify-content-center gap-2">
                    {OPTIONS_MENU_MODAL.map((item) => (
                      <li
                        key={item}
                        className={
                          "px-2 py-1 rounded-4 shadow bg-body-tertiary"
                        }
                      >
                        <a
                          role="button"
                          type="button"
                          className={
                            item.toUpperCase() === optionSelected.toUpperCase()
                              ? "active"
                              : ""
                          }
                          onClick={() => setOptionSelected(item)}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {isLoading ? (
                    <div className="m-3">
                      <DetailFeatureLoader />
                    </div>
                  ) : (
                    optionSelected.toUpperCase() === DETAIL.toUpperCase() &&
                    data && (
                      <DetailFeature feature={data} isFetching={isFetching} />
                    )
                  )}

                  {/* {
                      isFetching ?(
                        <div className="m-3">
                          <DetailFeatureLoader/>
                        </div>
                      ) : (optionSelected.toUpperCase() === DETAIL.toUpperCase() && data) && (
                        <DetailFeature
                          feature={data}
                        />
                      )
                    } */}

                  {optionSelected.toUpperCase() === ACTIVITY.toUpperCase() && data && (
                    <Activity feature={data}/>
                  )}
                </div>
              ) : (
                <div className="row">
                  <div className="col-12 col-xl-7">
                    {isLoading ? (
                      <div className="m-3">
                        <DetailFeatureLoader />
                      </div>
                    ) : (
                      data && (
                        <DetailFeature feature={data} isFetching={isFetching} />
                      )
                    )}
                  </div>
                  <div className="col-12 col-xl-5">
                    {
                      data && (
                        <Activity feature={data}/>
                      )
                    }
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFeature;
