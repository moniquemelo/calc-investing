export default function TabButton({ active, onClick, children }) {
  return(
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-t-lg ${
        active 
          ? "bg-white text-emerald-700 font-bold border-b-2 border-emerald-600" 
          : "text-gray-500 hover:text-gray-700 bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}