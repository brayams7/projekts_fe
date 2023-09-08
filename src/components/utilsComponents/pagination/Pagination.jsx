import { useState } from 'react';
import { stylesReactSelect } from '../../../utilsFunctions/forms';
import './pagination.css'
import Select from "react-select";

const LIST_SHOW_NUMBER_PER_PAGE = [
  {
    value:10,
    label:10
  },
  {
    value:20,
    label:20
  }
]

const Pagination = ({ table }) => {

  const [pageSize, setPageSize] = useState(
    {
      value:table.getState().pagination.pageSize,
      label:table.getState().pagination.pageSize
    }
  )

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 container-pagination">
      <div className="d-flex gap-2 pagination-buttons">
        <button
          type="button"
          className="border bg-secondary bg-gradient p-1"
          style={{ width: 40 }}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          type="button"
          style={{ width: 30 }}
          className="border p-1 bg-secondary bg-gradient"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          type="button"
          style={{ width: 30 }}
          className="border p-1 bg-secondary bg-gradient"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          type="button"
          style={{ width: 40 }}
          className="border bg-secondary bg-gradient p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>

      <span className="d-flex align-items-center flex-grap-1">
        <span>Página </span>
        <strong>
          {" "}
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </strong>
      </span>

      <span className="d-flex align-items-center gap-1 container-pagination-inputpage">
        | Ir a página:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            if (page <= table.getPageCount()) table.setPageIndex(page);
            else table.setPageIndex(0);
          }}
          className="form-control border py-1 ps-2 rounded"
        />
      </span>

      <div className="container-pagination-selectSizePage">
        <Select
          name="selectSizePage"
          className='select-numberPage'
          styles={stylesReactSelect}
          value={pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.value))
            setPageSize(e)
          }}
          isSearchable={false}
          options={LIST_SHOW_NUMBER_PER_PAGE}
          menuPlacement="auto"
          onMenuClose={false}
        />
      </div>

    </div>
  );
};

export default Pagination;
