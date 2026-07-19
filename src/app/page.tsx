'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

import Button from "@/components/ui/ButtonBM";
import TextInput from "@/components/ui/TextInputNLBBM";


export default function Home() {
  const emeraldText = "text-emerald-400";
  const grayText = "text-[#5b6c82]";

  const router = useRouter();
  const [username, setUsernameValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [text, setText] = useState('');

  const handleLoginButton = (): void => {

    // simple test
    if (username == "" || password == "") {
      setText("Please input your Username and Password");
    } else if (username != "admin" && password != "admin") {
      setText("Invalid Username or Password please try again");
    } else if (username == "admin" && password == "admin") {
      setText('');
      router.push('/admin')
    } else if (username == "user" && password == "user") {
      setText('');
      router.push('/info')
    }

  };
  
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm flex flex-col gap-4 items-center justify-center">

        {/* Header */}
        <div className="flex flex-col text-center">
          <p className="text-3xl">⚽</p>
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
            value={username}
            onChange={setUsernameValue}
            placeholder="Username"/>

          <TextInput
            type="password"
            value={password}
            onChange={setPasswordValue}
            placeholder="Password"/>

          {text && (
            <span className="text-red-400 text-center text-[14px]">{text}</span>
          )}

          <Button
            children="Login"
            onClick={handleLoginButton}
          />
    
        </div>

        {/* Register page link text */}
        <p className={`${grayText} font-sans mt-2`}>
          New here? <Link href="/register" className={`${emeraldText}`}>Sign up here</Link>
        </p>

      </div>
    </main>
  );
}
