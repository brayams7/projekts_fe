// import { useState } from "react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const list = [
  {
    name: "all",
    label: "Todos",
    id: "all"
  },
  {
    name: "my",
    label: "Mio",
    id: "my"
  }
]

const ID_FILTER_ASSIGNED_USERS = "assigned_users"

const ItemFilter = ({label,id, isActive,handleClick}) => {
  return (
    <span
      onClick={()=>handleClick(id)}
    className={`mx-2 ${isActive && "fw-bold purple-color"}`} role="button">
        {label}
      </span>
  )
}

const FilterPopover = ({columnFilters, setColumnFilters}) => {

  const user = useSelector(state=>state.auth.user)
  const [listFilters, setListFilters] = useState(list)
  // const [activeFilter, setActiveFilter] = useState("all")

  const filterAssignedUsers = columnFilters.find(item=>item.id === ID_FILTER_ASSIGNED_USERS)?.value || "all"

  const handleClick = (id) => {
    setColumnFilters(prev=>{

      const filter = prev.find(item=>item.id === ID_FILTER_ASSIGNED_USERS)?.value

      if(!filter){
        return prev.concat({
          id:ID_FILTER_ASSIGNED_USERS,
          value:id
        })
      }

      return prev.map((item)=>
        item.id === ID_FILTER_ASSIGNED_USERS ? {
          ...item,
          value:id
        }:
        item
      )
    })

  }
  useEffect(()=>{
    setListFilters((prev)=>{
      return prev.map((item)=>{
        if(item.name === "my"){
          return {
            ...item,
            id:user.id
          }
        }
        return item
      })
    })
  },[user])

  return (
    <div className="ms-auto gray-color-600">
      {
        listFilters.map((filter)=>{
          return (
            <ItemFilter
              key={filter.name}
              id={filter.id}
              name={filter.name}
              label={filter.label}
              // activeFilter={activeFilter}
              handleClick={handleClick}
              isActive={filterAssignedUsers === filter.id}
            />
          )
        })
      }

    </div>
  );
};

export default FilterPopover;
