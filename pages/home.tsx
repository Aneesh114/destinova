import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto mt-12 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Welcome to Destinova 🌍</h1>
        <p className="text-lg text-gray-700 mb-8">Find your perfect travel destination based on your preferences</p>
      </main>
    </>
  );
}