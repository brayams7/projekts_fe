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

export function getInitials(names) {
  names = names.trim().split(" ");
  let initials;

  if (names.length === 1 && names[0].length === 1) {
    initials = (names[0].substring(0, 1) + names[0].substring(0, 1)).toUpperCase();
  }

  if (names.length === 1 && names[0].length > 1) {
    initials = names[0].substring(0, 2).toUpperCase();
  }

  if (names.length === 2) {
    initials = (names[0].substring(0, 1) + names[1].substring(0, 1)).toUpperCase();
  }

  if (names.length >= 3) {
    initials = (names[0].substring(0, 1) + names[1].substring(0, 1) + names[2].substring(0, 1)).toUpperCase();
  }

  return initials;
}

export function validateEmail(email) {
  let regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
}
