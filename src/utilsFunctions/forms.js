const option = (styles, state)=>({
  ...styles,
  backgroundColor: state.isDisabled ? undefined : state.isFocused && 'rgba(40, 52, 62, 0.07)',
  color: '#242d49',
  borderColor: '#BBBBBB',
  borderWidth: 1,
  borderBottomStyle: 'solid',
  fontSize:12,
  cursor:"pointer"
})

const control = (styles) =>({
  ...styles,
  borderRadius: 8,
  minHeight:  40,
  // backgroundColor:'rgba(40, 52, 62, 0.07)',
  backgroundColor:"#ffff",
  border: '1px solid #dee2e6',
  fontFamily:'inherit',
  boxShadow:'none',
  outline:"none",
  fontWeight:'normal',
  fontSize:12
})

const placeholder = (styles) =>({
  ...styles,
  color: '#242d49',
  fontWeight:'normal',
  fontSize:12
})

const dropdownIndicator = (styles)=>({
  ...styles,
  color: "#424242",
})

const menuList = (styles) =>({
  ...styles,
  padding: 0,
  borderRadius:8
})

const menu = (styles) =>({
  ...styles,
  borderRadius: 8,
  fontWeight:'normal',
  // border: '1px solid #D8D8D8',
  fontSize:12,
  zIndex:3,
  // boxShadow: '0px 5px 12px rgba(90, 97, 105, 0.1), 0px 0px 35px rgba(90, 97, 105, 0.1)',
})

const indicatorSeparator =  ()=>({
  display: 'none',
})

export const stylesReactSelect = {
  option: option,
  control: control,
  placeholder: placeholder,
  indicatorSeparator: indicatorSeparator,
  dropdownIndicator: dropdownIndicator,
  menuList: menuList,
  menu: menu,
}
