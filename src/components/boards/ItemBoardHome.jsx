import { Link } from "react-router-dom";
import { API_BASE_STORAGE } from "../../services/settings";
import { useStylesLayout } from "../../hooks/layout/useStylesLayout";
import { PrivateRoutes } from "../../routes";

const ItemBoardHome = ({
  workspaceId,
  id,
  bg_color,
  bg_img,
  name
}) => {

  const {
    setStylesLayout
  } = useStylesLayout()

  const BASE_PRIVATE_PATH = `${PrivateRoutes.PRIVATE_WORKSPACE}/${workspaceId}`

  const styles = {
    board:{
      header:{
        backgroundColor:`${bg_color}a5`,
        color:"#44546f"
      }
    },
    content:{
      backgroundColor:bg_color,
      ...(bg_img ? {backgroundImage:`url(${API_BASE_STORAGE}${bg_img})`}: {})
    }
  }

  const handleChangeStylesLayout = ()=>{

    setStylesLayout({
      content: styles.content,
      board: styles.board,
      header: {},
      siderbar: {},
    });
  }

  return (
    <li className="board-container-item">
      <Link
        to={`/${BASE_PRIVATE_PATH}/${id}/${PrivateRoutes.BOARD}`}
        onClick={()=>handleChangeStylesLayout()}
        className="board-item"
        style={styles.content}
      >
        <span className="board-item-face"></span>

        <div className="board-item-body">
          <div className="board-item-body-title">{name}</div>
        </div>
      </Link>
      {/* <img src={urlImg} alt="test" width={200}/> */}
    </li>
  );
};

export default ItemBoardHome;
