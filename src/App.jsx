
// import {
//   LayoutDashboard,
//   Home,
//   StickyNote,
//   Layers,
//   Flag,
//   Calendar,
//   LifeBuoy,
//   Settings,
// } from "lucide-react";
// import Sidebar, { SidebarItem, SidebarSubItem } from "./components/Sidebar";

// function App() {
//   return (
//     <>
//       <div className="flex">
//         <Sidebar>
          
//           <SidebarItem icon={<Home size={20} />} text="Home" active />
//           <SidebarItem icon={<LayoutDashboard size={20} />} text="Upload Arquivos" />
//           <SidebarItem icon={<StickyNote size={20} />} text="Calculus" />
//           <SidebarItem icon={<Calendar size={20} />} text="Calendário" />
         
//           <SidebarItem icon={<Layers size={20} />} text="Calculus">
//             <SidebarSubItem text="Calculus 1" />
//             <SidebarSubItem text="Calculus 2" />
//             <SidebarSubItem text="Calculus 3" />
//           </SidebarItem>
//           <SidebarItem icon={<Flag size={20} />} text="Calculus" />
//           <hr className="my-3" />
//           <SidebarItem icon={<Settings size={20} />} text="Configurações" />
//           <SidebarItem icon={<LifeBuoy size={20} />} text="Ajuda" />
//         </Sidebar>
//       </div>   
//     </>
//   );
// }

// export default App;

// import { useState, useMemo } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import { HiSortAscending, HiChevronLeft, HiChevronRight, HiSearch } from "react-icons/hi";

// const data = [
//   { id: "TASK-1980", title: "Try to hack the IP panel", status: "In-Progress", priority: "High", hours: 4, createdAt: "April 4, 2025" },
//   { id: "TASK-9680", title: "The RAM pixel is down", status: "Done", priority: "Low", hours: 15, createdAt: "April 4, 2025" },
//   { id: "TASK-7481", title: "USB monitor is down", status: "Todo", priority: "Medium", hours: 6, createdAt: "April 4, 2025" },
//   { id: "TASK-3706", title: "Backing up the array", status: "In-Progress", priority: "Low", hours: 4, createdAt: "April 4, 2025" },
// ];

// export default function TaskTable() {
//   const columns = useMemo(
//     () => [
//       { accessorKey: "id", header: "Task" },
//       { accessorKey: "title", header: "Title" },
//       { accessorKey: "status", header: "Status" },
//       { accessorKey: "priority", header: "Priority" },
//       { accessorKey: "hours", header: "Est. Hours" },
//       { accessorKey: "createdAt", header: "Created At" },
//     ],
//     []
//   );

//   const [sorting, setSorting] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const table = useReactTable({
//     data,
//     columns,
//     state: { sorting, globalFilter },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   });

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">

//         {/* Barra de Pesquisa */}
//         <div className="relative mb-4">
//           <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Pesquisar tarefas..."
//             value={globalFilter}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <table className="w-full border-collapse">
//           <thead className="bg-gray-200 text-gray-700">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="p-3 text-left border-b border-gray-300">
//                     <button
//                       onClick={header.column.getToggleSortingHandler()}
//                       className="flex items-center gap-2"
//                     >
//                       {header.column.columnDef.header}
//                       <HiSortAscending className="h-4 w-4 text-gray-500" />
//                     </button>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="border-b border-gray-300 hover:bg-gray-100">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="p-3">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Paginação */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             <HiChevronLeft className="h-5 w-5" />
//           </button>

//           <span className="text-gray-700">
//             Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
//           </span>

//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             <HiChevronRight className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// App.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TaskTable from "./components/TaskTable";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="p-6 w-full bg-gray-50">
        {activePage === "home" && <h1 className="text-2xl font-bold">Bem-vindo</h1>}
        {activePage === "tasks" && <TaskTable />}
      </main>
    </div>
  );
}
