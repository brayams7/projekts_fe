import Exceljs from 'exceljs/dist/exceljs';

export const exportToExcel = (data, name, sheetName) =>{
  const workBook = new Exceljs.Workbook();

  const sheet = workBook.addWorksheet(sheetName);

  sheet.columns = [
    {
      header:"Id del espacio de trabajo",
      key:"idWorkspace"
    },
    {
      header:"Nombre del espacio de trabajo",
      key:"nameWorkspace"
    },
    {
      header:"Color del espacio de trabajo",
      key:"colorWorkspace"
    },
    {
      header:"Descripción del espacio de trabajo",
      key:"descriptionWorkspace"
    },
    {
      header:"Fecha de creación del espacio de trabajo",
      key:"createdAtWorkspace"
    },
    {
      header:"Fecha de actualización del espacio de trabajo",
      key:"updatedAtWorkspace"
    },
    {

    }
  ]
}
