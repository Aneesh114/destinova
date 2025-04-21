import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      const callback = router.query.callbackUrl || "/";
      router.replace(callback as string);
    }
  }, [status]);

  const handleLogin = () => {
    signIn("credentials", {
      email,
      password,
      callbackUrl: (router.query.callbackUrl as string) || "/",
    });
  };

  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-3" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border mb-3" />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </main>
    </>
  );
}