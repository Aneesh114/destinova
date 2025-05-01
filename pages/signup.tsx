// import Navbar from "../components/Navbar";
// import { useRouter } from "next/router";
// import { useState } from "react";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSignup = async () => {
//     const res = await fetch("/api/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     if (res.ok) {
//       alert("Signup successful!");
//       router.push("/login");
//     } else {
//       alert("Signup failed.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
//         <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
//         <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-3" />
//         <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-3" />
//         <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2 rounded">Sign Up</button>
//       </main>
//     </>
//   );
// }

import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const validatePassword = (password) => {
    const minLength = password.length >= 7;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasCapital && hasSpecialChar;
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 7 characters long, include 1 capital letter, and 1 special character.");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Signup successful!");
      router.push("/login");
    } else {
      alert("Signup failed.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-2 border mb-3"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-2 border mb-3"
        />

        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
          className="w-full p-2 border mb-3"
        />

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Sign Up
        </button>
      </main>
    </>
  );
}
