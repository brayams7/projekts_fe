import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import Search from '../../../assets/iconsHeader/search.svg'
import NewTask from "../newTask/NewTask";


const TableTask = ({columns, data, feature}) => {

  const [columnFilter, setColumnFilter] = useState([])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel:getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    onColumnFiltersChange:setColumnFilter,
    state :{
      columnFilters:columnFilter
    }
  })
  return (
    <div className="w-100">
      <div className="container">
        <div className="d-flex flex-wrap gap-3 mb-3">
          <span>{data.length} tareas</span>
          <div className="form-group position-relative has-search ms-auto">
                <img
                  className="form-control-feedback"
                  src={Search}
                  alt="search"
                />
                <input
                  type="search"
                  name="search"
                  className="form-control"
                  value={table.getColumn('title')?.getFilterValue() || ''}
                  style={{minHeight:40}}
                  onChange={(e)=>table.getColumn('title')?.setFilterValue(e.target.value)}
                  placeholder="Buscar por nombre"
                  aria-label="Search"
                />
              </div>
        </div>
        {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <div className="row row-cols-auto align-items-center row-taks-container mb-2" key={i}>
                {row.getVisibleCells().map((cell) => (
                  <div className={`col ${typeof cell.column.columnDef.header === 'string' && cell.column.columnDef.header}`} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="row text-center mb-2">
              <div>No existen datos</div>
            </div>
          )}
        <NewTask
          feature={feature}
        />

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
