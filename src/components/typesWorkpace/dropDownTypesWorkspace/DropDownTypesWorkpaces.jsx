// import { useEffect, useState } from "react";
import { stylesReactSelect } from "../../../utilsFunctions/forms";
import Select from "react-select";
import { useListTypeWorkspaceQuery } from "../../../rtkQuery/apiSliceTypeWorkspace";
import { useEffect, useState } from "react";


const DropDownTypesWorkpaces = ({handleChange}) => {
  const {data,isLoading,isError}=useListTypeWorkspaceQuery ()
  const [optionSelect,setOptionSelect] = useState ({})
  // useEffect(()=>{
  //   const getListTypeWorkspace = async () => {
  //   const response = await getListTypesWorkspaceService ()
  //   //console.log (response)
  //   if (response.code === 200){
  //     const data = response.data
  //     const mapdata = data.map((item)=>{
  //       return{
  //         ...item,
  //         label: item.name,
  //         value: item.id,
  //       }
  //     })
  //     //console.log(mapdata)
  //     setList(mapdata)
  //   }
  //   }
  //   getListTypeWorkspace ()
  // },[])
  useEffect (()=> {
    if (Array.isArray(data)&&data){
      if (data.length>=1){
        setOptionSelect (data[0])
      }
    }
  },[data])
  if (isLoading) {
    return (
      <div>
        cargando...
      </div>
    )
  }
  console.log (optionSelect)
  return (
    <div className="d-flex flex-wrap">
      <div className="form-group" style={{ minWidth: 230 }}>
        {Array.isArray (
          data
        )&&Object.keys(optionSelect).length>=1&& (
          <Select
          value={optionSelect}
          // defaultValue={data[0]}
          name="orderBy"
          styles={stylesReactSelect}
          // value={selectOrderBy}
          onChange={(e) => {
            setOptionSelect(e)
            handleChange (e)
          }}
          placeholder="Ordenar por..."
          options={data}
          menuPlacement="auto"
          onMenuClose={false}
        />
        )}
      </div>
    </div>
  );
};
export default DropDownTypesWorkpaces;
