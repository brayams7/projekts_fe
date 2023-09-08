import { useEffect, useState } from "react";
import { useGetBoardsByWorkspaceAndUserQuery } from "../../rtkQuery/apiSliceBoard"

export const useListBoardByWorkspace = ({idWorkspace, userId}) =>{
  const {isLoading, data=[], isError, currentData} = useGetBoardsByWorkspaceAndUserQuery({idWorkspace, userId})
  const [dataList, setDataList] = useState([])

  const handleSearch = (event) => {

    const list = [...data.data]
    const textData = event.target.value.toLowerCase()

    if(textData.trim().length === 0){
      setDataList(list)
      return
    }

    setDataList([
      ...list.filter((item) => {
        let name = item.name ? item.name.toLowerCase() : ""
        return name.includes(textData)
      })
    ])
  }

  useEffect(()=>{
    if(data?.data && Array.isArray(data?.data)){
      setDataList(data.data)
    }
  },[data])

  return {
    isLoading,
    isError,
    currentData,
    dataList,
    handleSearch,
    setDataList
    // getListLoading
  }

}
