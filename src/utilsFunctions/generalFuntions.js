export const orderByASC = (list = []) =>{
  return list.slice().sort();
}

export const orderByDESC = (list=[])=>{
  return list.slice().sort((a,b)=>b.localeCompare(a))
}

export const orderObjectByASC = (list = []) =>list.slice().sort((a, b) => a.name.localeCompare(b.name))

export const orderObjectByDESC = (list = []) =>list.slice().sort((a, b) => b.name.localeCompare(a.name))

export const sortAscByOrder = (list=[])=> list.sort((a,b)=> a.order.toString().localeCompare(b.order.toString()))


export const getIdParams = (params)=>{
  let id = null

  try {
    const rest_url = params["*"].trim()

    if(rest_url)  id = rest_url.split("/")[0] || null
    // id = ((typeof id === "number") && id > 0) ? id : null

  } catch (error) {
    return null
  }

  return id
}

export const createRoute = ({
  name,
  path,
  isShowInSidebar,
  permission,
  isAsync=false,
  icon=null,
  stylesLayout
})=>({

  name,
  path,
  isShowInSidebar,
  isAsync,
  permission,
  stylesLayout,
  ...(icon?{icon}:{}),
})
