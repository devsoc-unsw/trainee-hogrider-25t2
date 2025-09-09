import Nav from "../_components/nav";

// Ethan code here!!!
export default async function Excuse() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Nav />

      {/* Form Section */}
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">What's your excuse?</h2>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-lg font-medium">WYA</label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2 text-lg"
              placeholder="Where are you?"
            />
          </div>

          <div>
            <label className="mb-1 block text-lg font-medium">
              Destination
            </label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2 text-lg"
              placeholder="Where are you going?"
            />
          </div>

          <div>
            <label className="mb-1 block text-lg font-medium">Time</label>
            <input
              type="time"
              className="w-full rounded border border-gray-300 p-2 text-lg"
            />
          </div>

          <div>
            <label className="mb-1 block text-lg font-medium">Why Late</label>
            <textarea
              className="w-full rounded border border-gray-300 p-2 text-lg"
              placeholder="Explain why you're late"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-xl text-white hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
