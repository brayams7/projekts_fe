import TxtFIle from '../../assets/attachments/txt.png'
import PdfFile from '../../assets/attachments/pdf.png'
import PptxFile from '../../assets/attachments/pptx.png'
import PptFile from '../../assets/attachments/ppt.png'
import DocFile from '../../assets/attachments/doc.png'
import DocxFile from '../../assets/attachments/docx.png'
import XlsFile from '../../assets/attachments/xls.png'
import XlsxFile from '../../assets/attachments/xlsx.png'
import CsvFile from '../../assets/attachments/csv.png'
import ImgFile from '../../assets/attachments/img.png'

export const mimeTypesImages = [".webp",".gif",".jpg",".jpeg",".png"]

export const attachmentsIcons = [
  {
    extensions:[".pptx"],
    icon:PptxFile,
  },
  {
    extensions:[".ppt"],
    icon:PptFile,
  },
  {
    extensions:[".xls"],
    icon:XlsFile,
  },
  {
    extensions:[".xlsx"],
    icon:XlsxFile,
  },
  {
    extensions:[".doc"],
    icon:DocFile,
  },
  {
    extensions:[".docx"],
    icon:DocxFile,
  },
  {
    extensions:[".txt"],
    icon:TxtFIle,
  },
  {
    extensions:[".csv"],
    icon:CsvFile,
  },
  {
    extensions:[".pdf"],
    icon:PdfFile,
  },
  {
    extensions:mimeTypesImages,
    icon:ImgFile,
  }
]
