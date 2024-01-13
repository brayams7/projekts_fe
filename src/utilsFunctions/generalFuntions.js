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


export function debounceFuntion(fn, delay){
  let timer

  return function(){
    const self = this.self
    const args = this.arguments

    clearTimeout(timer)

    timer = setTimeout(function(){
      fn.apply(self, args)
    }, delay)
  }
}

export function formatTime(seconds){

 try{
    const secondsToNumber = Number(seconds)

    const days = Math.floor(secondsToNumber / (24 * 3600))

    const hours = Math.floor((secondsToNumber % (24 * 3600)) / 3600)

    const minutes = Math.floor((secondsToNumber % 3600) / 60)

    const remainingSeconds = secondsToNumber % 60

    let formattedTime = ''

    if (days > 0) formattedTime += `${days}d `

    if (hours > 0) formattedTime += `${hours}h `

    if (minutes > 0) formattedTime += `${minutes}m `


    formattedTime += `${remainingSeconds}s`

    return formattedTime.trim()

 }catch(err){

   return ''

 }
}

export const  formatTimeTracking =  (totalMinutes) =>{
  if (typeof totalMinutes !== 'number' || totalMinutes < 0) {
    throw new Error('El total de minutos debe ser un número positivo.')
  }

  // const days = Math.floor(totalMinutes / (24 * 60))
  // const remainingHours = totalMinutes % (24 * 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return {
    // days,
    hours,
    minutes,
  }
}

export const getFormatTime = (time) =>{
  let formtattedTime = ''

  if(time.hours > 0){
    formtattedTime += `${time.hours}h `
  }

  if(time.minutes > 0){
    formtattedTime += `${time.minutes}m `
  }

  return formtattedTime
}
