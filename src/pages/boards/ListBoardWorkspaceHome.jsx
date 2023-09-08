import "./boardsStyle.css"
import { DoorDashLoader } from "../../components/utilsComponents/MySkeleton";
import React, { useRef} from "react";
import ItemBoardHome from "../../components/boards/ItemBoardHome";
import CreateNewBoard from "../../components/boards/CreateNewBoard";
import Select from "react-select";
import { stylesReactSelect } from "../../utilsFunctions/forms";
import Search from "../../assets/iconsHeader/search.svg";
import { useListBoardByWorkspace } from "../../hooks/board/useListBoardByWorkspace";
import { orderObjectByASC, orderObjectByDESC } from "../../utilsFunctions/generalFuntions";

const ORDER_BY_ASC = "ORDER_BY_ASC"
const ORDER_BY_DESC = "ORDER_BY_DESC"

const optionsOrderBy = [
  {
    label:"Orden alfabético de la A a la Z",
    value:ORDER_BY_ASC,
    orderMethod:orderObjectByASC
  },
  {
    label:"Orden alfabético de la Z a la A",
    value:ORDER_BY_DESC,
    orderMethod:orderObjectByDESC
  }
]


const ListBoardWorkspaceHome = ({idWorkspace, userId, isSearch=false}) => {
  const {
    isLoading,
    isError,
    currentData,
    dataList,
    setDataList,
    handleSearch
  } = useListBoardByWorkspace({idWorkspace, userId})

  // const [idWorkspaceSelect, setIdWorkspaceSelect] = useState(idWorkspace)
  // const [selectOrderBy, setSelectOrderBy] = useState("")
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const itemLoader = useRef(<DoorDashLoader/>)

  const getListLoading = () => {
    const list = []
    for (let i = 0; i < randomNumber; i++) list.push(itemLoader.current)
    return list
  }


  if (isLoading && !currentData) {
    return (
      <ul className="list-unstyled d-flex flex-wrap justify-content-start gap-2 list-boards-home">
        {
          getListLoading().map((item, i)=>(
            <li key={i} className="board-container-item">
              {item}
          </li>
          ))
        }
    </ul>
    );
  }

  if(isError){
    <p>Upss Ocurrio un error</p>
  }

  return (
    <React.Fragment>

      <CreateNewBoard idWorkspace={idWorkspace}/>
      {
        isSearch && (
          <div className="d-flex mb-4 flex-wrap gap-3">
              <div className="form-group" style={{minWidth:230}}>
                <Select
                  name="orderBy"
                  styles={stylesReactSelect}
                  // value={selectOrderBy}
                  onChange={(e)=>setDataList(e.orderMethod(dataList))}
                  placeholder="Ordenar por..."
                  options={optionsOrderBy}
                  menuPlacement="auto"
                  onMenuClose={false}
                />
              </div>
              <div className="form-group position-relative has-search ms-auto">
                <img
                  className="form-control-feedback"
                  src={Search}
                  alt="search"
                />
                <input
                  type="search"
                  name="search"
                  className="form-control"
                  style={{minHeight:40}}
                  onChange={handleSearch}
                  placeholder="Buscar tableros"
                  aria-label="Search"
                />
              </div>
          </div>
        )
      }

      <ul className="list-unstyled d-flex flex-wrap justify-content-start gap-2 list-boards-home">
      {
        Array.isArray(dataList) && (
          dataList.map(item=>(
            <ItemBoardHome
              key={item.id}
              bg_color={item.bg_color}
              bg_img={item.bg_img}
              description={item.description}
              name={item.name}
              user_id={item.user_id}
              workspaceId={item.workspace_id}
              id={item.id}
            />
          ))
        )
      }
      <li className="board-container-item">
        <div
          // role="button"
          type="button"
          className="board-item-add d-flex align-items-center justify-content-center text-center"
          data-bs-toggle="modal"
          data-bs-target="#modalBoard"
          // onChange={()=>setIdWorkspaceSelect(idWorkspace)}
        >
          <span>
            Crear un tablero nuevo
          </span>
        </div>
      </li>
    </ul>
    </React.Fragment>
  );
};


export default ListBoardWorkspaceHome;
