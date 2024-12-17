import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div
        className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col md:flex-row gap-2
      *:outline-none"
      >
        <input
          className="w-full rounded-full h-10 bg-gray-200 pl-5 ring ring-transparent 
          focus:ring-orange-500 focus:ring-offset-2 transition-shadow
          placeholder:text-red-600 peer"
          type="email"
          required
          placeholder="Search here..."
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block ">
          Email is required
        </span>
        <button
          className="bg-black bg-opacity-70 text-white py-2 rounded-full active:scale-90 focus:scale-90 
        transition-transform font-medium md:px-5 bg-grad"
        >
          Search
        </button>
      </div>
    </main>
  );
}
