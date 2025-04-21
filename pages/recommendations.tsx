import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Recommendations() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      const callbackUrl = encodeURIComponent(router.asPath);
      router.replace(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold">Recommendations Page</h2>
        <p>Welcome, {session?.user?.email}</p>
        {/* Show recommendation logic here */}
      </main>
    </>
  );
}
