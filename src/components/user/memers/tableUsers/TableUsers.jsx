import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import Search from "../../../../assets/iconsHeader/search.svg";

const TableUsers = ({ dataList, columns }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: dataList,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <React.Fragment>
      <div
        className="form-group position-relative has-search ms-auto mb-2"
        style={{ width: 200 }}
      >
        <img className="form-control-feedback" src={Search} alt="search" />
        <input
          type="search"
          name="seach_members"
          className="form-control"
          style={{ minHeight: 40 }}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          placeholder="Buscar miembros"
          aria-label="Search"
        />
      </div>
      <div className="table-responsive">
        <table
          className="table table-hover rounded table-borderless align-middle"
          style={{ backgroundColor: "var(--gray)" }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <thead key={headerGroup.id}>
              <tr>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
        </table>
      </div>

      {/* <Pagination table={table} /> */}
    </React.Fragment>
  );
};

export default TableUsers;
