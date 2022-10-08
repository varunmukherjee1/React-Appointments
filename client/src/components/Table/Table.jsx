import React, {useMemo} from 'react'
import {useTable, usePagination} from "react-table"
// import {Columns} from "./UserColumns"

import classes from "./Table.module.css"

function Table(props) {

  const myData = props.data;

  // console.log(myData);

  const columns = useMemo(() => props.columns, [props.columns])
  const data = useMemo (() => myData, [myData])

  const tableInstance = useTable({
    columns,
    data,
    initialState: {pageSize: 8}
  },
  usePagination)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow
  } = tableInstance;

  const {pageIndex} = state;

  return (
    <div>
      <table {...getTableProps()} className = {classes.table}>
        <thead className={classes.thead}>
          {
            headerGroups.map((headerGroup) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column,id) => {
                      return (
                        <th key = {id} {...column.getHeaderProps}>
                          {column.render("Header")}
                        </th>
                      )
                    })
                  }
                </tr>
              );
            })
          }
        </thead>
        <tbody {...getTableBodyProps()} className = {classes.tbody}>
          {
            page.map((row,id) => {
              prepareRow(row);

              return (
                <tr key = {id} {...row.getRowProps()}>
                  {
                    row.cells.map((cell,id) => {
                      return (
                        <td key = {id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className = {classes.navigation}>
        <button onClick = {() => previousPage()} disabled = {!canPreviousPage}> &lt; </button>
        <p><strong>{pageIndex + 1}</strong> / <strong>{pageOptions.length}</strong></p>
        <button onClick = {() => nextPage()} disabled = {!canNextPage}> &gt; </button>
      </div>
    </div>
  )
}

export default Table