export default function Header() {
  return (
    <header className="w-full">
      <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <div className="flex-1 flex justify-between px-4 md:px-0">
          <div className="flex-1 flex items-center ml-11 md:ml-6">
            <h1 className="text-xl font-bold text-gray-900 md:hidden">
              Admin Dashboard
            </h1>
          </div>
          <div className="mx-4 flex items-center">
            <div className="flex items-center justify-center rounded-full bg-gray-200 h-8 w-8 text-sm font-medium text-gray-700">
              BA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
