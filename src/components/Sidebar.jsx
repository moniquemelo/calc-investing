// /* eslint-disable react/prop-types */


// import { ChevronDown, ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
// import { createContext, useContext, useState } from "react";
// // import logo from "../assets/logo.jpg";
// // import profile from "../assets/profile.png";

// const SidebarContext = createContext();

// export default function Sidebar({ children }) {
//     const [expanded, setExpanded] = useState(true);
//     return (
//         <>
//             <aside className="h-screen">
//                 <nav className="h-full flex flex-col bg-[#660099] border-r shadow-lg">
//                     {/* Logo and Toggle */}
//                     <div className="p-4 pb-2 flex justify-between items-center">
//                         {/* <img
//                             src={logo}
//                             className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
//                         /> */}
//                         <button
//                             onClick={() => setExpanded((curr) => !curr)}
//                             className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 shadow"
//                         >
//                             {expanded ? <ChevronFirst /> : <ChevronLast />}
//                         </button>
//                     </div>

//                     <SidebarContext.Provider value={{ expanded }}>
//                         {/* Navigation Items */}
//                         <ul className="flex-1 px-3">{children}</ul>
//                     </SidebarContext.Provider>

//                     {/* Footer */}
//                     <div className="border-t border-gray-200 flex p-3">
//                         {/* <img src={profile} className="w-10 h-10 rounded-md" /> */}
                        
//                         <div
//                             className={`flex justify-between items-center overflow-hidden transition-all ${
//                                 expanded ? "w-52 ml-3" : "w-0"
//                             }`}
//                         >
//                             <div className="leading-4">
//                                 <h4 className="font-semibold text-white">Calculus</h4>
//                                 <span className="text-xs text-gray-300">calculus@telefonica.com</span>
//                             </div>
//                             <MoreVertical size={20} className="text-gray-300" />
//                         </div>
//                     </div>
//                 </nav>
//             </aside>
//         </>
//     );
// }

// export function SidebarItem({ icon, text, active, alert, children }) {
//   const { expanded } = useContext(SidebarContext);
//   const [open, setOpen] = useState(false);

//   return (
//       <>
//           <li
//               onClick={() => {
//                   if (expanded) setOpen((prev) => !prev); // Só abre/fecha se o menu estiver expandido
//               }}
//               className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all group ${
//                   active
//                       ? "bg-gradient-to-tr from-purple-300 to-purple-200 text-purple-900"
//                       : "hover:bg-purple-700 text-white"
//               } ${expanded ? "justify-start" : "justify-center"}`}
//           >
//               {/* Ícone do item */}
//               {icon}

//               {/* Texto do item */}
//               <span
//                   className={`overflow-hidden transition-all ${
//                       expanded ? "w-52 ml-3" : "w-0"
//                   }`}
//               >
//                   {text}
//               </span>

//               {/* ChevronDown (setinha) */}
//               {children && (
//                   <ChevronDown
//                       className={`ml-auto transition-transform ${
//                           open ? "rotate-180" : ""
//                       } ${expanded ? "opacity-100" : "opacity-0 w-0 invisible"}`}
//                       size={20}
//                   />
//               )}

//               {/* Alerta (opcional) */}
//               {alert && (
//                   <div
//                       className={`absolute right-2 w-2 h-2 rounded-full bg-red-500 ${
//                           expanded ? "" : "top-2"
//                       }`}
//                   />
//               )}
//           </li>

//           {/* Dropdown: Só aparece quando expandido */}
//           {children && open && expanded && (
//               <ul className="ml-6 mt-1 space-y-1 transition-all">
//                   {children}
//               </ul>
//           )}
//       </>
//   );
// }



// export function SidebarSubItem({ text }) {
//     return (
//         <li className="pl-6 py-1.5 text-sm rounded-md cursor-pointer text-gray-300 hover:bg-purple-800 hover:text-white transition-colors">
//             {text}
//         </li>
//     );
// }


// components/Sidebar.jsx
import { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiHome,
  HiViewGrid,
  HiDotsVertical,
} from "react-icons/hi";

export default function Sidebar({ activePage, setActivePage }) {
  const [expanded, setExpanded] = useState(true);

  const items = [
    { icon: <HiHome />, text: "Home", key: "home" },
    { icon: <HiViewGrid />, text: "Modelo 1", key: "tasks" },
  ];

  return (
    <aside className="h-screen bg-[#660099] text-white flex flex-col transition-all duration-300">
      {/* Header with toggle */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-black"
        >
          {expanded ? <HiChevronLeft /> : <HiChevronRight />}
        </button>
      </div>

      {/* Navigation items */}
      <ul className="flex-1 space-y-1 px-2">
        {items.map((item) => (
          <li
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-purple-700 transition ${
              activePage === item.key
                ? "bg-purple-300 text-purple-900"
                : ""
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {expanded && <span className="whitespace-nowrap">{item.text}</span>}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-gray-400 flex items-center gap-3">
        {expanded && (
          <div className="leading-tight">
            <p className="font-semibold">Calculus</p>
            <p className="text-sm text-gray-300">calculus@telefonica.com</p>
          </div>
        )}
        <HiDotsVertical className="ml-auto" />
      </div>
    </aside>
  );
}
