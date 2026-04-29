

export const SearchBar = () => {
  return (
    <div className="border-b border-gray-100  w-full px-4 py-5 bg-white">
       <div className="flex items-center gap-2">
        <input type="text" className="border w-full rounded-md px-2 py-1.25" placeholder="Search..." />
        <div className="relative">
          <select className="block w-15  px-4 py-1.25 text-white bg-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
           
            <option value="2">All</option>
            <option value="3">Price</option>
            <option value="4">Stock</option>
            <option value="5">Name</option>
            <option value="6">Date</option>
            <option value="7">Status</option>
          </select>
        </div>
        <div className="relative">
          <select className="block w-40 px-4 py-1.25 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="1">Select Category</option>
            <option value="2">All Categories</option>
            <option value="3">Price</option>
            <option value="4">Stock</option>
            <option value="5">Name</option>
            <option value="6">Date</option>
            <option value="7">Status</option>
          </select>
        </div>
        
        <div className="relative">
          <select className="block w-40 px-4 py-1.25 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="1">Select Category</option>
            <option value="2">All Categories</option>
            <option value="3">Price</option>
            <option value="4">Stock</option>
            <option value="5">Name</option>
            <option value="6">Date</option>
            <option value="7">Status</option>
          </select>
        </div>
        <div className="relative">
          <select className="block w-40 px-4 py-1.25 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="1">Select Category</option>
            <option value="2">All Categories</option>
            <option value="3">Price</option>
            <option value="4">Stock</option>
            <option value="5">Name</option>
            <option value="6">Date</option>
            <option value="7">Status</option>
          </select>
        </div>
       </div>
    </div>
  )
}
