import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Search from '../../../assets/iconsHeader/search.svg'
import NewTask from "../newTask/NewTask";
import FilterPopover from "./FilterPopover";
import SimpleModal from "../../utilsComponents/modal/SimpleModal";
import EditTask from "./editTask/EditTask";
import AddNewTaskChildren from "../taskChildren/addNewTaskChildren/AddNewTaskChildren";
import { useDispatch } from "react-redux";
import { setListTasks } from "../../../redux/slices/tasksSlice";

// const useSkipper = () => {
//   const shouldSkipRef = useRef(true)
//   const shouldSkip = shouldSkipRef.current

//   const skip = useCallback(()=>{
//     shouldSkipRef.current = true
//   },[])

//   useEffect(()=>{
//     shouldSkipRef.current = true
//   })

//   return [shouldSkip, skip]
// }

// const defaulColumnTitleTask = {
//   cell:({ getValue, row: { index }, column: { id }, table }) =>{
//     const initialValue = getValue()
//     const [value, setValue] = useState(initialValue)

//     const onBlur = () => {
//       table.options.meta?.updateData(index, id, value)
//     }

//     useEffect(() => {
//       setValue(initialValue)
//     }, [initialValue])

//     return (
//       <input
//         value={value}
//         onChange={e => setValue(e.target.value)}
//         onBlur={onBlur}
//       />
//     )
//   }
// }


const TableTask = (
  {
    columns,
    data,
    feature,
    isOpenModal,
    onCloseModal,
    selectedTask,
    selectedTaskParent,
    // setListTasks
  }
) => {

  const [columnFilter, setColumnFilter] = useState([])
  const [expanded, setExpanded] = useState({})
  const dispatch = useDispatch()
  // const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable({
    columns,
    data,
    // defaultColumn:defaulColumnTitleTask,
    // autoResetPageIndex,
    // manualExpanding:true,
    // autoResetExpanded:false,
    // getExpandedDepth:()=>-1,

    getCoreRowModel:getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    getExpandedRowModel:getExpandedRowModel(),
    onColumnFiltersChange:setColumnFilter,
    onExpandedChange:setExpanded,
    getSubRows: (row) => row.sub_tasks,
    state :{
      columnFilters:columnFilter,
      expanded,
    },
    meta:{
      updateData:(rowIndex, columnId, value)=> {
        const list = data.map((row, index)=>{
          if(index === rowIndex){
            return {
              ...row,
              [columnId]:value
            }
          }
          return row
        })
        dispatch(setListTasks(list))
        // setListTasks(
        //   prev=> prev.map(
        //     (row, index)=>{
        //       if(index === rowIndex){
        //         return {
        //           ...prev[rowIndex],
        //           [columnId]:value
        //         }
        //       }
        //       return row
        //     }
        //   )
        // )
      },
      addSubtasks:(rowIndex, subTasks, parent)=> {
        const list = data.map((row, index)=>{
          if(index === rowIndex){
            console.log(data[rowIndex])
            return {
              ...data[rowIndex],
              count_children:parent.count_children,
              sub_tasks: subTasks
            }
          }
          return row
        })
        dispatch(setListTasks(list))
        // setListTasks(
        //   prev=> prev.map(
        //     (row, index)=>{
        //       if(index === rowIndex){
        //         console.log(prev[rowIndex])
        //         return {
        //           ...prev[rowIndex],
        //           sub_tasks: subTasks
        //         }
        //       }
        //       return row
        //     }
        //   )
        // )
      }
    }
  })
  useEffect(()=>{
    return ()=>{
      table.resetExpanded(true)
    }
  },[feature.id])


  return (
    <div className="w-100">
      <SimpleModal
        isOpen={isOpenModal}
        onClose={onCloseModal}
        title="Editar Tarea"
      >
        {
          selectedTask && (
            <EditTask
              task={selectedTask}
            />
          )
        }

        {
          !selectedTask && (
            <AddNewTaskChildren
              rowParent={selectedTaskParent}
              table={table}
            />
          )
        }
      </SimpleModal>

      <div className="container">
        <div className="d-flex flex-wrap gap-3 mb-3 align-items-center">
          <span>{data.length} tareas</span>
          <div className="form-group position-relative has-search ms-auto">
            <img className="form-control-feedback" src={Search} alt="search" />
            <input
              type="search"
              name="search"
              className="form-control"
              value={table.getColumn("title")?.getFilterValue() || ""}
              style={{ minHeight: 40 }}
              onChange={(e) =>
                table.getColumn("title")?.setFilterValue(e.target.value)
              }
              placeholder="Buscar por nombre"
              aria-label="Search"
            />
          </div>

          <FilterPopover columnFilters={columnFilter} setColumnFilters={setColumnFilter}/>
        </div>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row, i) => (
            <div
              className="row row-cols-auto align-items-center row-taks-container mb-3"
              key={i}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  className={`col ${
                    typeof cell.column.columnDef.header === "string" &&
                    cell.column.columnDef.header
                  }`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {/* {
                      cell.renderValue('Cell', {
                        isLoading: isRowLoading,
                        isExpanded: expanded[row.id],
                      })
                    } */}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="row text-center mb-2">
            <div>No existen datos</div>
          </div>
        )}
        <NewTask feature={feature} />
      </div>
      {/* <table
        className="table table-hover rounded table-borderless"
        style={{ backgroundColor: "var(--gray)" }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <thead key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {
                    header.isPlaceholder ? null :
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  }
                </th>
              ))}
            </tr>
          </thead>
        ))}
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr key={i}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={12}>No existen datos</td>
            </tr>
          )}
        </tbody>
      </table> */}
    </div>
  );
};

export default TableTask;
