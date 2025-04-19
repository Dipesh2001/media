import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
};

const DataTable = <T,>({ columns, data, loading }: DataTableProps<T>) => {
  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {columns &&
              columns.map((col) => (
                <th key={col.accessor as string}>{col.header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data found
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={(row as any).id || rowIndex}>
                {columns.map((col) => (
                  <td key={col.accessor as string}>
                    {col.cell
                      ? col.cell(row[col.accessor], row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
