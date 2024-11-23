import React from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { MdSwapHorizontalCircle } from "react-icons/md";

import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
  usePagination,
} from "react-table";

// we are makingg a high order function that takes a table data and returns a table component
//  using <T extends object> means that the table data must be of type object here we are saying
// that it must be a generic type object and we are calling it T and we are saying that it must have a type of T and pass this type to the Table component
function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  // we are using the useTable hook from react-table to get the table state and the table
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      gotoPage,
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);
    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((columns) => (
                  <th
                    {...columns.getHeaderProps(columns.getSortByToggleProps())}
                  >
                    {columns.render("Header")}
                    {columns.isSorted && (
                      <span>
                        {" "}
                        {columns.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
              First Page
            </button>
            <button onClick={previousPage} disabled={!canPreviousPage}>
              Previous
            </button>
            <span>{` ${pageIndex + 1} - ${pageCount} `}</span>
            <button onClick={nextPage} disabled={!canNextPage}>
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={pageIndex === pageCount - 1}
            >
              Last Page
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
