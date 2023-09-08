import './moreTopics.css'
import CloseModal from "../../assets/generals/close-modal.svg"

import { ListTopicsBoards } from './ListTopicsBoards';
import { LIST_MANE_BG_COLORS_ITEMS, LIST_MANE_GRADIENTS_COLORS_ITEMS } from '../../utils/contants/colorsHex';

const styles = {
  flexWrap:"wrap"
}


const MoreTopicsOptions = () => {
  return (
    <div className="container-custom-modal container-moreTopics px-3 py-3">
      <div className="d-flex justify-content-between">
        <span className="w-100 text-center">Fondos de tablero</span>
        <button
          type="button"
          className="close-modal"
          aria-label="Cerrar ventana emergente"
        >
          <img src={CloseModal} alt="close modal" width={16} />
        </button>
      </div>
      <div className="mb-3 mx-auto" style={{width:"95%"}}>
        <p className="fw-normal font-size-12-14 mb-2">Fondo</p>
        <div className="mb-3">
          <ListTopicsBoards
            height={45}
            width={80}
            list={LIST_MANE_GRADIENTS_COLORS_ITEMS}
            styles={styles}
          />
        </div>
        <hr />
        <div className="mb-3">
          <ListTopicsBoards
            height={45}
            width={80}
            list={LIST_MANE_BG_COLORS_ITEMS}
            styles={styles}
          />

        </div>
      </div>
    </div>
  );
};

export default MoreTopicsOptions;
