import { useState } from 'react';
import './layout.css'
import Header from './Header';
import Footer from './Footer';
import Siderbar from './Siderbar';

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="wrapper">
      <div className="body-overlay"></div>

      <Siderbar showMenu={showMenu}/>

      {/*Siderbar-desing Close */}

      {/*page-content start */}

      <div className={showMenu ? "active":""} id="content" style={{minHeight:"100vh"}}>
        {/*top-navbar start */}

        <Header setShowMenu={setShowMenu} showMenu={showMenu}/>

        {/*top-navbar end */}

        {/*main-content-start */}

        <div className="main-content">

          {
            children
          }
          {/* <div className="row">
            <div className="col-md-12">
            </div>
          </div> */}
        </div>

        {/*main-content-end */}


        {/*Footer-desing */}
        
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;