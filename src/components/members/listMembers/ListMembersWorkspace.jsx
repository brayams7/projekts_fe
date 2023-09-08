import { createColumnHelper} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TableMembers from "./TableMembers";


const columnHelper = createColumnHelper()

const ListMembersWorkspace = () => {

  const {
    data
  } = useOutletContext()

  // const columns = useMemo(()=>[

  //   columnHelper.accessor("",{
  //     header:"profile",
  //     accessorFn: row=> row.username
  //   }),
  //   columnHelper.accessor("username",{
  //     cell:(info)=><span>{info.getValue()}</span>,
  //     header:"Usuario"
  //   }),
  //   columnHelper.accessor("email",{
  //     cell:(info)=><span>{info.getValue()}</span>,
  //     header:"Correo"
  //   }),

  //   columnHelper.accessor("",{
  //     cell:(info)=><span>{info.getValue()}</span>,
  //     header:"test"
  //   }),
  // ],[])

  const columns = [

    columnHelper.accessor("picture_url",{
      header:"profile",
      cell:(info)=>(
        info?.getValue() ? <img className="d-block rounded-circle" style={{width:32, height:32}} src={info.getValue()} alt="profile" />
        : <span className="d-block rounded-circle" style={{width:32, height:32}}>

        </span>
      )
    }),
    columnHelper.accessor("username",{
      cell:(info)=><span>{info.getValue()}</span>,
      header:"Usuario"
    }),
    columnHelper.accessor("email",{
      cell:(info)=><span>{info.getValue()}</span>,
      header:"Correo"
    }),
  ]

  const [dataList, setDataList] = useState([])

  useEffect(()=>{
    if(data && Array.isArray(data?.members)){
      setDataList(data.members)
    }
  },[data])

  return (
    <div className="">
      <div className="mb-2">
        <span className="font-weight-600 blue-dark-color" style={{fontSize:22}}>
          Miembros del Espacio de trabajo {Array.isArray(data?.members) && data.members.length}
        </span>
        <p className="w-75">
          Los miembros del Espacio de trabajo pueden ver todos los tableros visibles
          para el Espacio de trabajo, unirse a ellos y crear nuevos tableros en el Espacio de trabajo.
        </p>
      </div>
      <hr />
      <div className="mb-2">
        <span className="font-weight-600 blue-dark-color" style={{fontSize:22}}>
        Invite a los miembros a unirse
        </span>
        <div className="row">
          <div className="col-12 col-md-9">
            <p>
              Cualquiera que tenga un enlace de invitación puede unirse a este Espacio de trabajo gratuito.
              Puede crear un enlace nuevo para este Espacio de trabajo.
            </p>
          </div>
          <div className="col col-md-3">
            <button type="button" className="btn btn-secondary">
              Invitar mediante enlace
            </button>
          </div>
        </div>
      </div>
      <hr />
      <TableMembers
        dataList={dataList}
        columns={columns}
      />
    </div>
  );
};

export default ListMembersWorkspace;
