import './index.css'
//import { API_BASE_UI_AVATARS } from "../../../../services/settings";


//const SIZE_AVATAR = 32
const ProfileEditPage= () => {

  return (



  <div>
    <div className="d-flex align-items-center justify-content-start">
       <h2><strong> Perfil  </strong> </h2>
  </div>
  <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInputName" placeholder="Name"/>
  <label htmlFor="floatingInputName">Nombre completo</label>
</div>

  <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email</label>
</div>
<div className="form-floating mb-3s">
  <input type="text" className="form-control" id="floatingInputUserName" placeholder="usuario"/>
  <label htmlFor="floatingInputUserName">Usuario</label>
</div>

{/*
  <div className="d-flex align-items-center justify-content-start">
          <span className="d-block rounded-circle text-center" title={user.name}>
           <p><img
              src={`${API_BASE_UI_AVATARS}/?name=${user.name}&background=random&color=fff&size=${SIZE_AVATAR}`}
              alt="avatar"
              className="rounded-circle"
            /></p>
          </span>
          <p><span className="ms-2">{user.name}</span></p>
        </div> */}

  </div>






  )
}
export default ProfileEditPage
