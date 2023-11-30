const ProfileOffCanvas =() => {
  return (
  <div>
  <div className="p-3 text-Light-emphasis bg-Light-subtle border border-Light-subtle rounded-3">
  <div>
    <img src="https://ui-avatars.com/api//?name=Rodrigo%20de%20Leon&background=random&color=fff&size=32"
      className= "rounded-circle"
      alt="avatar"
      width="65px"
      height="65px" />  <span className="font-size-14-14 gap-2"> Rodrigo de Leon</span>
  </div>
  <div className="d-flex gap-4 flex-wrap">
      <div className="d-flex flex-column">
      <span className="fw-bold font-size-12-14"> Rol </span>
      <span className="font-size-10-12">Administrador</span>
      </div>
      <div className="d-flex flex-column">
      <span className="fw-bold font-size-12-14"> Correo Electronico </span>
      <span className="font-size-10-12">rodrigo@gmail.com</span>
      </div>
      <div className="d-flex flex-column">
      <span className="fw-bold font-size-12-14"> Usuario </span>
      <span className="font-size-10-12">Rodrigo de Leon</span>
      </div>
  </div>

  <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className= "nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Actividad</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Mi trabajo</button>
  </li>
  <li className="nav-item" role="presentati on">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Asignado</button>
  </li>
  <li class="nav-item" role="presentation">
    <button className="nav-link" id="calender-tab" data-bs-toggle="tab" data-bs-target="#calender-tab-pane" type="button" role="tab" aria-controls="calender-tab-pane" aria-selected="false">Calendario</button>
  </li>

</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
    <div className="d-flex flex colum gap-3 mt-3">ㅤㅤ
      <div>
        <button className="rounded px-4 py-2" style={{border:"1px dashed var(--purple)"}}>
        Añade tus tareas más importantes aquí.
        </button>
        </div>
        </div>
        <div>ㅤㅤ</div>
        <span className="fw-bold font-size-12-14"> Actividadㅤ ㅤㅤㅤㅤㅤㅤㅤㅤ ㅤㅤㅤㅤㅤㅤ<button className="rounded ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        </button> <span className="text-body-secondary">
  Buscar tareas...ㅤ
</span> </span><div className="vr"></div>ㅤ  <button className="rounded " style={{border:"0px dashed var(--bs-dark)"}}>
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708"/>
</svg> <span className="fw-light">ocultar</span>ㅤ </button>

<button className="rounded " style={{border:"0px dashed var(--bs-dark)"}}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-nested" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"/>
</svg> <span className="fw-light">Actividades</span>
        </button> <div>ㅤ</div>
        <div>ㅤ</div>
       <div>
       ㅤㅤㅤㅤㅤㅤㅤㅤㅤ  <img src="https://app-cdn.clickup.com/es-ES/no-activity.63da800f65dc106c118fa16773f814e7.svg"

      alt="avatar"
      width="350px"
      height="350px" />
  </div>
  <span>ㅤㅤㅤㅤㅤㅤTodavía no hay nada que ver. La actividad de la tarea aparecerá aquí.</span>



   </div>


  <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

  <nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <button className="nav-link active" id="nav-homes-tab" data-bs-toggle="tab" data-bs-target="#nav-homes" type="button" role="tab" aria-controls="nav-homes" aria-selected="true">Pendiente</button>
    <button className="nav-link" id="nav-profiles-tab" data-bs-toggle="tab" data-bs-target="#nav-profiles" type="button" role="tab" aria-controls="nav-profiles" aria-selected="false">Terminado</button>
    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Delegado</button>
    </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-homes" role="tabpanel" aria-labelledby="nav-homes-tab" tabindex="0"><div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
      ▷Hoy
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
      <div className="accordion-body">
      ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ<img src="https://app-cdn.clickup.com/es-ES/sanbath_chill.700beda22e65d32475d72ba306977084.png"

      alt="avatar"
      width="300px"
      height="300px" />
      <div>ㅤㅤ</div>
      <strong className="text-center">ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ¡Ya está!.</strong>
      <div><span>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤLas tareas y los recordatorios programados para hoy aparecerán aquí.</span></div>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
      ▷Vencido
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
      <div className="accordion-body">

<div><span>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤNo hay tareas atrasadas ni recordatorios programados.</span></div>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
      ▷Siguiente
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
      <div className="accordion-body">
      <span>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤNo hay próximas tareas ni recordatorios programados.</span>
      </div>
    </div>
  </div>
</div></div>
  <div className="tab-pane fade" id="nav-profiles" role="tabpanel" aria-labelledby="nav-profiles-tab" tabindex="0"> <div>ㅤ</div>  <span className="fw-bold font-size-12-14"> Terminado </span></div>
  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"> <div>ㅤ</div>  <span className="fw-bold font-size-12-14"> Delegado </span></div>

  </div>

  </div>

  </div>



<div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">


  <nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
  <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Tareas</button>
    <button className="nav-link" id="nav-contacts-tab" data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false">Comentarios</button>
    </div>
</nav>
<div className="tab-content" id="nav-tabContent">
<div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
<button className="rounded " style={{border:"0px dashed var(--bs-dark)"}}>
<div>ㅤ</div>
<span className="fw-bold font-size-12-14"> No programada </span>
        </button></div>




  <div className="tab-pane fade" id="nav-contacts" role="tabpanel" aria-labelledby="nav-contacts-tab" tabindex="0">
    <div>ㅤ</div>
    <span>No hay comentarios asignados.</span></div>

</div>





  </div>





  <div className="tab-pane fade" id="calender-tab-pane" role="tabpanel" aria-labelledby="calender-tab" tabindex="0">osos</div>
  </div>
  </div>

  )
}
export default ProfileOffCanvas
