import './modal.css'

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   minWidth: 300,
//   bgcolor: "background.paper",
//   boxShadow: 24,
// };


const ModalWrapper = ({open, onClose, children, title})=>{

  return(
    <div className={`custom-modal ${open && "is-open"} `} onClick={()=>onClose()}>
      <div className="custom-modal-container shadow" onClick={(e)=>e.stopPropagation()}>
        <button type="button" className='custom-modal-closer' onClick={()=>onClose()}>X</button>
        <div className="custom-modal-body">
          <span>{title}</span>
          <hr />
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper;
