import { useListTagsQuery } from "../../../rtkQuery/apiSliceTags";
import LoadingIcon from '../../../assets/loadings/EllipsisLoading40px.svg'

import './listTags.css'
import { useEffect, useState } from "react";

const TagItem = ({tag}) => {

  return (
    <li>{tag.tag}</li>
  )

}


const ListTags = () => {
  const [listTags, setListTags] = useState([])
  const [inputText, setInputText] = useState("")
  const [existTag, setExistTag] = useState(false)
  const { data, isLoading } = useListTagsQuery()


  const handleChangeInput = (e)=>{
    const value = e.target.value
    setInputText(value)
  }

  // const handleChange = (e)=>{

  // }

  // const handleSearch = (list=[],text="") => {

  //   const textData = text.toLowerCase()
  //   const list = [...data]

  //   if(textData.trim().length === 0){
  //     setListTags(list)
  //     return
  //   }

  //   setListTags([
  //     ...list.filter((item) => {

  //       const listStr = Object.values(item).filter((item)=> typeof item === "string").join(" ")

  //       //let name = item.name ? item.name.toLowerCase() : ""
  //       return listStr.includes(textData)
  //     })
  //   ])
  // }


  useEffect(()=>{
    if(data) setListTags(data)
  },[data])

  if(isLoading){
    return (
      <div className="d-flex align-items-start justify-content-center">
        <img src={LoadingIcon} alt="loading" />
      </div>
    )
  }
  return (
    <div className="list-tags ont-size-12-14">
      {
        Array.isArray(listTags) && listTags.length === 0 && (
          <input
            type="text"
            name="tag"
            id="tag"
            placeholder="Escribe el nombre del tag"
            className="form-control"
            value={inputText}
          />
        )
      }
      <hr />
      <ul className="d-flex flex-row align-items-center gap-2">
        {Array.isArray(listTags) && listTags.map((tag) => (

          <TagItem
            key={tag.id}
            tag={tag}
          />

        ))}
      </ul>


    </div>
  );
};

export default ListTags;
