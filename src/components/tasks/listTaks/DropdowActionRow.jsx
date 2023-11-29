import { EditIcon } from "../../../utils/icons/iconsLexicalEditor";
import { AddIcon, DeleteIcon, MoreIcon, MoveToIcon } from "../../../utils/icons/iconsMenu";

const DropdowActionRow = ({ onOpen, setSelectedTask, row, setSelectedParent }) => {
  return (
    <div className="dropdown dropdown-option-task-container">
      <a
        // href={`#addMemberOption`}
        type="button"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        <span className="mx-2">
          <MoreIcon fill="var(--gray-600)" />
        </span>
      </a>
      <ul
        className="dropdown-menu shadow rounded p-3 border-0 font-size-12-14"
        style={{minWidth:250}}
      >
        {/* <div className="font-size-14-16 font-weight-600 text-center">
          Enumerar acciones
        </div> */}
        <a
          type="button"
          role="button"
          onClick={() => {
            onOpen()
            setSelectedTask(row.original)
          }}
          className="mb-2 d-flex gap-2 align-items-center"
        >
            <span>
              <EditIcon height="20" width="20" fill="var(--lightDark)"/>
            </span>
            <span>Editar tarea</span>
        </a>
        {
          row.depth === 0 && (
            <a
              type="button"
              role="button"
              onClick={() => {
                onOpen()
                setSelectedParent(row)
              }}
              className="mb-2 d-flex gap-2 align-items-center"
            >
              <span>
                <AddIcon height="24" width="24" fill="var(--lightDark)"/>
              </span>
              <span>Agregar subtarea</span>
            </a>
          )
        }
        <a type="button" role="button" className="mb-2 d-flex gap-2 align-items-center">
            <span>
              <MoveToIcon height="24" width="24" fill="var(--lightDark)"/>
            </span>
            <span>Mover</span>
          </a>
        <hr />
        <a type="button" role="button" className="mb-2 d-flex gap-2 red-color align-items-center">
            <span>
              <DeleteIcon height="24" width="24" fill="var(--red)"/>
            </span>
            <span>Eliminar</span>
          </a>
      </ul>
    </div>
  );
};

export default DropdowActionRow;
