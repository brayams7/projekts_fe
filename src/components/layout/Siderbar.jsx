
import { useSelector } from 'react-redux';
import Logo from '../../assets/logo2.png'
import { MenuWorkspace } from '../../Menu';
import ItemMenu from './ItemMenu';
import { menuPermissions } from '../../utilsFunctions/auth';

// eslint-disable-next-line react/prop-types
const Siderbar = ({showMenu}) => {

  const auth = useSelector(state=>state.auth)

  const {permissions} = auth

  // const menuPermissions = () => {
  //   const filteredLiksByPermission = [...MenuItems].reduce(
  //     (acc, item)=>{
  //       if(permissions.find((permission)=> permission.name.includes(item.permission))) acc.push(item)
  //       return acc
  //     },
  //     []
  //   )
  //   return filteredLiksByPermission
  // }

  return (
    <div id="sidebar" className={showMenu ? "text-start active":"text-start"}>
        <div className="sidebar-header">
          <h3>
            <img src={Logo} alt="logo" className="img-fluid" />{" "}
            <span>Projetks</span>
          </h3>
        </div>
        <ul className="list-unstyled nav flex-column component m-0">

          {
            menuPermissions(MenuWorkspace,permissions).map((item,id)=>(
              item?.isShowInSidebar && (
                <ItemMenu
                  key={id}
                  name={item.name}
                  icon={item.icon}
                  path={item.path}
                  subroutes={item?.subroutes ? item.subroutes : []}
                />
              )
            ))
          }
        </ul>
      </div>
  );
};

export default Siderbar;
