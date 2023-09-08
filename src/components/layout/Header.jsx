
// eslint-disable-next-line react/prop-types
const Header = ({setShowMenu,showMenu}) => {
  return (
    <div className="top-navbar">
          <div className="xd-topbar w-100">
            <div className="row">
              <div className="col-2 col-md-1 col-lg-1 order-2 order-md-1 align-self-center">
                <div className="xp-menubar" onClick={()=>setShowMenu(!showMenu)}>
                  <span className="material-symbols-outlined">
                    signal_cellular_alt
                  </span>
                </div>
              </div>

              <div className="col-md-5 col-lg-4 order-3 order-md-2">
                <div className="xp-searchbar">
                  <form>
                    <div className="input-group">
                      <input
                        type=""
                        id="search"
                        name="search"
                        className="form-control"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn"
                          type="submit"
                          id="button-addon2"
                        >
                          Buscar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-10 col-md-6 col-lg-7 order-1 order-md-3">
                <div className="xp-profilebar text-end">
                  <nav className="navbar p-0 justify-content-start justify-content-lg-end">
                    <ul className="nav navbar-nav flex-row">
                      <li className="dropdown nav-item active">
                        <a
                          href="#"
                          className="nav-link"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="material-symbols-outlined">
                            notifications
                          </span>
                          <span className="notification">4</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              Tienes 4 notificaciones
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Tienes 4 notificaciones
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <a href="#" className="nav-link" type="button">
                          <span className="material-symbols-outlined">
                            help
                          </span>
                        </a>
                      </li>

                      <li className="dropdown nav-item">
                        <a
                          href="#"
                          className="nav-link"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src=""
                            alt="user"
                            style={{ width: 40, borderRadius: "50%" }}
                          />
                          <span className="xp-user-live"></span>
                        </a>
                        <ul className="dropdown-menu small-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <span className="material-symbols-outlined">
                                person
                              </span>{" "}
                              Profile
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <span className="material-symbols-outlined">
                                settings
                              </span>{" "}
                              Settings
                            </a>
                          </li>

                          <li>
                            <a className="dropdown-item" href="#">
                              <span className="material-symbols-outlined">
                                logout
                              </span>{" "}
                              Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Header;