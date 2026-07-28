'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";


export default function Home() {
  const emeraldText = "text-emerald-400";
  const grayText = "text-[#5b6c82]";

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == "true") { 
      router.push("/admin");
    } else if (token) { 
      router.push("/info");
    }
  }, [router]);


  function persistTokenAndGoHome(access_token: string, is_admin: boolean) {
    const decoded: any = jwtDecode(access_token);
    const isAdmin = JSON.stringify(is_admin)
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("sub", decoded.sub);
    localStorage.setItem("token", access_token);
    if (isAdmin == "true") { 
      router.push("/admin");
    } else {
      router.push("/info");
    }
  }


  async function fetchLogin() {

        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({grant_type: "password",username, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Invalid Username or Password');
            }

            persistTokenAndGoHome(data.access_token, data.is_admin);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Something went wrong, please try again.")
            }
        } finally {
            setLoading(false);
        }
    }
  
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm flex flex-col gap-4 items-center justify-center animate-card">

        {/* Header */}
        <div className="flex flex-col text-center">
          <p className="text-3xl animate-bounce-in">⚽</p>
          <p className="text-[#5b6c82] text-[14px]">First Drink</p>
          <p className={`${emeraldText} text-[16px]`}>
            <strong>Software Engineering</strong>
          </p>
        </div>

        {/* Login Text */}
        <h1 className="mt-6 mb-4 text-[40px]"><strong>Login</strong></h1>

        {/* login fields */}
        <div className="flex flex-col gap-2 w-full">
          
          <TextInput 
            label=""
            value={username}
            onChange={setUsername}
            placeholder="Username"/>

          <TextInput
            label=""
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Password"/>

          {error && (
            <span className="text-red-400 text-center text-[14px] animate-shake">{error}</span>
          )}

          <Button
            children="Login"
            onClick={fetchLogin}
          />
    
        </div>

        {/* Register page link text */}
        <p className={`${grayText} font-sans mt-2`}>
          New here? <Link href="/register" className={`${emeraldText} link-underline`}>Sign up here</Link>
        </p>

      </div>
    </main>
  );
}
