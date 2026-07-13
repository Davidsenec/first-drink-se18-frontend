'use client'
import Button from "@/components/ui/Button";
import TextInputNLB from "@/components/ui/TextInputNLB";
import Link from "next/link";

export default function Home() {
  const emeraldText = "text-emerald-400";
  const grayText = "text-[#5b6c82]";
  
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
          
          <TextInputNLB placeholder="Username"/>

          <TextInputNLB type="password" placeholder="Password"/>

          <Button children="Login"/>
    
        </div>

        {/* Register page link text */}
        <p className={`${grayText} font-sans mt-2`}>
          New here? <Link href="/register" className={`${emeraldText}`}>Sign up here</Link>
        </p>
        <Link className={`${emeraldText}`} href="/edit-info">Edit Info page Test</Link>
        <Link className={`${emeraldText}`} href="/admin">Admin page Test</Link>
        <Link className={`${emeraldText}`} href="/info">Info page Test</Link>

      </div>
    </main>
  );
}
