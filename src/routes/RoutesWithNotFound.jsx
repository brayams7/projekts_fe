import { Route, Routes } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RoutesWithNotFound = ({children}) => {
  
  return (
    <Routes>
      {children}
      <Route path='*' element={<h1>Page not found 1</h1>}/>
    </Routes>
  );
};

export default RoutesWithNotFound;