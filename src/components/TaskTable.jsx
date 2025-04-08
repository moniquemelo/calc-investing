import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  HiSearch,
  HiSortAscending,
  HiSortDescending,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiPlus,
  HiDownload,
} from "react-icons/hi";

const data = [
  { id: "TASK-1980", title: "Hack IP panel", status: "In-Progress", priority: "High", hours: 4, createdAt: "April 4, 2025" },
  { id: "TASK-9680", title: "RAM pixel down", status: "Done", priority: "Low", hours: 15, createdAt: "April 4, 2025" },
  { id: "TASK-7481", title: "USB monitor issue", status: "Todo", priority: "Medium", hours: 6, createdAt: "April 4, 2025" },
];

export default function TaskTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo(() => [
    { accessorKey: "id", header: "Task" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "priority", header: "Priority" },
    { accessorKey: "hours", header: "Est. Hours" },
    { accessorKey: "createdAt", header: "Created At" },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-6">
      {/* Barra superior com botões */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">
            <HiDownload /> Exportar
          </button>
          <button className="flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg">
            <HiPlus /> Adicionar
          </button>
        </div>
      </div>

      {/* Tabela */}
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortedColumn = sorting.find((s) => s.id === header.column.id);
                return (
                  <th
                    key={header.id}
                    className="p-3 text-left border-b cursor-pointer"
                    onClick={() => header.column.toggleSorting()}
                  >
                    <div className="flex items-center gap-1">
                      {header.column.columnDef.header}
                      {sortedColumn?.desc ? <HiSortDescending /> : <HiSortAscending />}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>{table.getPrePaginationRowModel().rows.length} registros encontrados</span>

        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            className="border rounded p-1"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>

          <button className="p-2" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <HiChevronDoubleLeft />
          </button>
          <button className="p-2" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <HiChevronLeft />
          </button>
          <button className="p-2" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <HiChevronRight />
          </button>
          <button className="p-2" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <HiChevronDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
}
