import { useEffect, useState } from "react";

import "./headerBoard.css";
import Button from "/src/components/utilsComponents/button/Button.jsx";
import EditBoard from "/src/components/boards/EditBoard.jsx";
import { FilterIcon } from "../../../utils/icons/iconsMenu";
import { typesViewBoards } from "../../../Menu";
import { useDispatch } from "react-redux";
import { setTypeViewSelect } from "../../../redux/slices/boardSlice";

const HeaderBoard = ({
  stylesBoard, name, handleUpdateBoard, description, color, typeViewSelect, boardId, workspaceId
  // bgImage,
  // workspaceId,
  // userId,
}) =>
{
  const [isEditShowed, setIsEditShowed] = useState(false);
  const dispatch = useDispatch();
  const [nameBoard, setNameBoard] = useState("");
  const [isEditNameBoard, setIsEditNameBoard] = useState(false);

  const handleChaneItem = (id) =>
  {
    dispatch(setTypeViewSelect(id));
  };

  useEffect(() =>
  {
    if (name) setNameBoard(name);
  }, [name]);

  return (
    <div
      className="d-flex flex-wrap px-4 align-items-center white-color gap-3"
      style={{
        backgroundColor: stylesBoard.header.backgroundColor, height: 50
      }}
    >
      <div
        className="font-weight-700 header-board-container-title"
        role="button"
        onClick={() => setIsEditNameBoard(true)}
      >
        {!isEditNameBoard &&
          (
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title={nameBoard}
              className="d-inline-block"
              style={{ fontSize: "var(--size-20)", display: "block" }}
              // title={nameBoard}
            >
            {/*{nameBoard}*/}
          </span>
          )}
        {isEditNameBoard &&
          (
            <input
              type="text"
              className="header-board-container-input px-2 w-100"
              placeholder="Ingresa un nombre"
              // ref={refTextAreaTitleStage}
              dir="auto"
              autoFocus
              onKeyDown={(e) =>
              {
                if (e.key !== "Enter") return;
                setIsEditNameBoard(false);
                if (!nameBoard.trim()) setNameBoard(name);
                handleUpdateBoard(nameBoard, description, color, {});
              }}
              onBlur={() =>
              {
                setIsEditNameBoard(false);
                if (!nameBoard.trim()) setNameBoard(name);
                handleUpdateBoard(nameBoard, description, color, {});
              }}
              style={{
                overflowWrap: "break-word" // backgroundColor:stylesBoard.header.backgroundColor
              }}
              onChange={(e) => setNameBoard(e.target.value)}
              value={nameBoard}
            />
          )}
      </div>

      <ul className="nav nav-underline gap-4">
        {typesViewBoards.map(type => (
          <li className="nav-item" key={type.id}>
              <span className="me-2">
                {type.icon("var(--blueDark)")}
              </span>
            <a
              type="button"
              role="button"
              className={typeViewSelect === type.id
                ? "py-1 header-board-container-nav-item active"
                : "py-1 header-board-container-nav-item"}
              onClick={() => handleChaneItem(type.id)}
            >

              {type.name}
            </a>
          </li>
        ))}

        {/* <li className="nav-item">
            <span className="me-2">
              <ListIcon
                fill="var(--blueDark)"
              />
            </span>
          <NavLink className="py-2 header-board-container-nav-item" to={"list"}>
            Lista
          </NavLink>
        </li> */}

      </ul>

      <Button
        onClick={() => setIsEditShowed(true)}
      >
        Editar
      </Button>
      <EditBoard
        name={name}
        workspaceId={workspaceId}
        show={isEditShowed}
        setShow={setIsEditShowed}
      />
      {/* <ul className="nav nav-underline header-board-container-nav-right gap-2 ms-auto">
          <li className="nav-item">
            <a className="blue-dark-color px-2 py-1 rounded-3 header-board-button-filter" type="button" role="button">
              <span className="me-2">
                <FilterIcon
                  fill="var(--blueDark)"
                />
              </span>
              filtrar
            </a>
          </li>
          <li className="nav-item">
          </li>
          <li className="nav-item d-flex align-items-center">
            <a className="d-block text-center" type="button" role="button">
              <span className="header-profile d-inline-block rounded-circle">
                BG
              </span>
            </a>
          </li>
      </ul> */}

    </div>
  );
};

export default HeaderBoard;
