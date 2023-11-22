import { createColumnHelper } from "@tanstack/react-table";
import { API_BASE_UI_AVATARS } from "../../../../services/settings";
import { useEffect, useState } from "react";
import TableUsers from "./TableUsers";
import { RemoveIcon } from "../../../../utils/icons/iconsMenu";


const columnHelper = createColumnHelper()

const SIZE_AVATAR = 32

const ListUsers = ({
  list=[],
  handleDeleteUser
}) => {
  const [listUser, setListUsers] = useState([])
  const columns = [

    // columnHelper.accessor("picture_url",{
    //   header:"profile",
    //   cell:(info)=>(
    //     info?.getValue() ? <img className="d-block rounded-circle" style={{width:32, height:32}} src={info.getValue()} alt="profile" />
    //     : <span className="d-block rounded-circle" style={{width:32, height:32}}>

    //     </span>
    //   )
    // }),
    columnHelper.accessor("fullName",{
      cell:(info)=>{

        const original = info.row.original
        const name = original.name

        return (
          <div className="d-flex align-items-center gap-2">
            <span>
              <img
                src={`${API_BASE_UI_AVATARS}/?name=${name}&background=random&color=fff&size=${SIZE_AVATAR}`}
                alt="avatar"
                className="rounded-circle"
              />
            </span>
            <div className="d-flex flex-column">
              <span>{name}</span>
            </div>
          </div>
        )
      },
      header:()=>{
        return (
          <div className="text-start">
            <span>Nombre</span>
          </div>
        )
      }
    }),
    columnHelper.accessor("username",{
      cell:(info)=>{

        const original = info.row.original
        // const username = original.username
        const email = original.email

        return (
          <div className="d-flex align-items-center gap-2">

            <div className="d-flex flex-column">
              <span>{info.getValue()}</span>
              <span className="lightBlue_color font-size-12-14">{email}</span>
            </div>
          </div>
        )
      },
      header:()=>{
        return (
          <div className="text-start">
            <span>Usuario</span>
          </div>
        )
      }
    }),

    columnHelper.accessor("actions",{
      // id:"actions",
      cell:({row})=>{
        const original = row.original
        const id = original.id
        return (
          <div
            className="d-flex justify-content-center"

          >

            <button
              onClick={()=>handleDeleteUser(id)}
            >
              <RemoveIcon fill="var(--gray-600)"/>
            </button>
          </div>
        )
      },
      header:()=>{
        return (
          <div className="text-center">
            <span>Acciones</span>
          </div>
        )
      }
    })
  ]

  useEffect(()=>{

    setListUsers(list)
  },[list])

  return (
    <div>
      <TableUsers
        columns={columns}
        dataList={listUser}
      />
    </div>
  );
};

export default ListUsers;
