import { useState } from "react";
import { AddMemberIcon, ExpandIcon, MoreIcon, NewTagIcon, VisibilityIcon } from "../../../utils/icons/iconsMenu";
import './detailFeature.css'
import TitleDetailFeature from "../titleFeature/TitleDetailFeature";
import Wysiwyg from "../../wysiwyg/Wysiwyg";
// import Wysiwyg from "../../wysiwyg/Wysiwyg";

const DetailFeature = () => {

  const [editModeTitle, setEditModeTitle] = useState(false)
  const [titleFeature, setTitleFeature] = useState("")


  // const handleTextareaInput = (e) => {
  //   const textarea = e.target;
  //   textarea.style.height = 'auto'; // Restablecer la altura a 'auto' antes de calcular

  //   // Ajustar la altura al contenido scrollHeight
  //   console.log(textarea.scrollHeight)
  //   textarea.style.height = textarea.scrollHeight + 'px';
  // };

  return (
    <div className="mb-2">
      <section className="d-flex justify-content-start align-items-center gap-2 mb-2">
        <ul className="d-flex align-items-center gap-2 ist-unstyled">
          <li className="dropdown">
            <a
              href={`#stagesOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              Backlog
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id={"stagesOption"}
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

          <li className="dropdown">
            <a
              href={`#addMemberOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span>
                <AddMemberIcon fill="var(--gray-600)" />
              </span>
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id="addMemberOption"
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
        </ul>
        <span
          className="d-block mx-2"
          style={{ height: 20, borderLeft: "1px solid var(--gray-600)" }}
        ></span>
        <ul className="d-flex align-items-center gap-2 ist-unstyled ms-auto">
          <li className="dropdown">
            <a
              href={`#addMemberOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span>
                <MoreIcon fill="var(--lightDark)" />
              </span>
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id="addMemberOption"
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
        </ul>
      </section>
      <section className="d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2 font-size-12-14">
        <ul className="d-flex align-items-center gap-2 ist-unstyled">
          <li
            className="d-flex flex-column align-items-center ps-3"
            style={{ borderLeft: "1px solid var(--gray-600)" }}
          >
            <span>FECHA DE CREACIÓN</span>
            <span>sep. 10, 10:49 pm</span>
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
                <span>8:00:00</span>
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
            className="d-flex flex-column align-items-center ps-3"
            style={{ borderLeft: "1px solid var(--gray-600)" }}
          >
            <span>FECHA LÍMITE</span>
            <li className="dropdown">
              <a
                href={`#dueDateOption`}
                type="button"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
              >
                <span>Sep. 10</span>
              </a>
              <ul
                className="dropdown-menu p-2 custom-dropdown-card"
                id="dueDateOption"
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
        </ul>
        <div className="dropdown ms-auto">
          <a
            href={`#VisibilityOption`}
            type="button"
            role="button"
            className="position-relative me-3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <VisibilityIcon fill="var(--purple)" />
            <span
              style={{ top: 8 }}
              className="position-absolute start-100 translate-middle badge rounded-pill bgPurple-color fw-normal"
            >
              99+
            </span>
          </a>
          <ul
            className="dropdown-menu p-2 custom-dropdown-card"
            id="VisibilityOption"
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
        </div>
      </section>

      <section className="section-tags-feature d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2 font-size-12-14">
        <ul className="d-flex align-items-center gap-2 ist-unstyled">
          <li className="dropdown">
            <a
              href={`#newTagOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed feature-add-new-tag d-block text-center">
                <NewTagIcon fill="var(--gray-600)" height="20" width="20" />
              </span>
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id="newTagOption"
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
        </ul>
      </section>

      <section className="section-title-feature d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2">
        <div
          className="w-100"
          role="button"
          onClick={()=>{if(editModeTitle) return; setEditModeTitle(true); setTitleFeature("Este es un titulo")}}
        >
          {
            editModeTitle ? (
              <TitleDetailFeature
                setEditModeTitle={setEditModeTitle}
                setTitleFeature={setTitleFeature}
                titleFeature={titleFeature}
              />
            ):(
              <h3 className="fw-bold">Este es un titulo</h3>
            )
          }
        </div>
      </section>

      <section className="section-description-feature mb-2">
        <Wysiwyg/>
      </section>
    </div>
  );
};

export default DetailFeature;
