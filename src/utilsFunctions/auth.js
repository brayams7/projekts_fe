
export const menuPermissions = (menuItems=[], permissions=[]) => {
  const filteredLiksByPermission = [...menuItems].reduce(
    (acc, item)=>{
      const i = {...item}
      if(permissions.find((permission)=> permission.name.includes(item.permission))){
        let subRoutes = []
        if(i?.subroutes && Array.isArray(i?.subroutes))
          subRoutes = i.subroutes.filter(subRoute => subRoute.isShowInSidebar)

        i.subroutes = subRoutes
        acc.push(i)
      }

      return acc
    },
    []
  )
  return filteredLiksByPermission
}

export const mapMenuWithoutIcon = (menuItems)=>{
  return [...menuItems].map(menu=>{
    if(menu?.subroutes){
      menu.subroutes =  mapMenuWithoutIcon(menu?.subroutes)
    }
    // eslint-disable-next-line no-unused-vars
    const {icon,...rest} = menu
    return {
      ...rest
    }
  })
}

export const flattenRoutes = (routes) =>{
  const menu = [...routes]

  return menu.flatMap(route => {
    if (route.subroutes) {
      const {subroutes, ...restRout} = route

      const listChildrenRoutes = flattenRoutes(subroutes)

      // eslint-disable-next-line no-unused-vars
      return [restRout, ...listChildrenRoutes] //retornamos las rutas y sus subrutas

    } else return route
  })
}

export const validatePathInMenu = (menuItems=[], routeBase, pathname)=>{
  const currentRoute = flattenRoutes(menuItems)
                      .filter(item=> `/${routeBase}/${item.path}` === pathname)

  return currentRoute[0] ? currentRoute[0] : null
}

export const  removeDuplicates = (arr, campo)=> {
  const unique = []
  const valoresUnicos = new Set()

  for (const item of arr) {

    const valorCampo = item[campo]

    if (!valoresUnicos.has(valorCampo)) {
      valoresUnicos.add(valorCampo)
      unique.push(item)
    }
  }

  return unique
}


