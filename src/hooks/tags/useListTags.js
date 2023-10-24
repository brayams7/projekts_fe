import { useEffect, useState } from "react"
import { useListTagsQuery } from "../../rtkQuery/apiSliceTags"


export const useListTags = () => {
  const [listTags, setListTags] = useState([])
  const [inputText, setInputText] = useState("")
  const [existTag, setExistTag] = useState(false)
  const { data, isLoading } = useListTagsQuery()


  const handleChangeInput = (e)=>{
    const value = e.target.value
    setInputText(value)
    handleChange(value)

  }

  const handleChange = (text="")=>{
    const textData = text.toLowerCase()
    const list = [...data]
    const newList = handleSearch(list,textData)

    setListTags(newList)

    if(newList.length > 0){
      setExistTag(true)
    }else{
      setExistTag(false)
    }

  }

  const handleSearch = (list=[],text="") => {

    if(text.trim().length === 0) return list


    return [
        ...list.filter((item) => {

        const listStr = Object.values(item).filter((item)=> typeof item === "string").join(" ")

        //let name = item.name ? item.name.toLowerCase() : ""
        return listStr.includes(text)
      })
    ]
  }

  useEffect(()=>{

    if(data) setListTags(data)

  },[data])

  return {
    listTags,
    inputText,
    existTag,
    isLoading,
    handleChangeInput,
    handleChange,
    handleSearch
  }
}
