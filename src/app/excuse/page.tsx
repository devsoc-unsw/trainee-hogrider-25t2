import Nav from "../_components/nav";

// Ethan code here!!!
export default async function Excuse() {
  // return (
  //   <>
  //     <p>Excuse page</p>
  //   </>
  // );
  return (
  // <nav className="flex items-center justify-between bg-black text-white p-4">
  //     <a href="/excuse" className="text-2xl font-bold">
  //       Excuse Page
  //     </a>

  //     <ul className="flex space-x-8 text-xl">
  //       <li>
  //         <a href="Home">Home</a>
  //       </li>
        
  //       <li>
  //         <a href="History">History</a>
  //       </li>
        
  //       <li>
  //         <a href="Stats">Pricing</a>
  //       </li>
  //     </ul>
  // </nav>
    <div className="min-h-screen bg-gray-100 p-8">
      <Nav/>

      {/* Form Section */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">What's your excuse?</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-1">WYA</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-lg"
              placeholder="Where are you?"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Destination</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-lg"
              placeholder="Where are you going?"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded p-2 text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Why Late</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-lg"
              placeholder="Explain why you're late"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-xl hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
