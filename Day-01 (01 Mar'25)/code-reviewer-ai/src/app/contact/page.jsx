export default function Contact() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-4 text-gray-700">
          Have questions? Reach out to us below!
        </p>
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Send Message
          </button>
        </form>
      </div>
    );
  }
  