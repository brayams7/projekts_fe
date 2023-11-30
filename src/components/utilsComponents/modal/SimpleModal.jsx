import { CloseIcon } from '../../../utils/icons/iconsMenu';
import './simpleModal.css'

const SimpleModal = ({isOpen, onClose, title, children}) => {


  return (
    <div className={`simple-modal ${isOpen && "is-open"} `} onClick={()=>onClose()}>
      <div className="simple-modal-container shadow-lg" onClick={(e)=>e.stopPropagation()}>
        <div className="d-flex justify-content-between">
          <span className='simple-modal-title fs-6 fw-bold'>{title}</span>
          <button type="button" className="fw-bold" onClick={()=>onClose()}>
            <span>
              <CloseIcon fill='var(--gray-600)'/>
            </span>
          </button>
        </div>
        <hr />

        <div className="simple-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
