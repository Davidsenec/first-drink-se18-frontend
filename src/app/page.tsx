'use client'
import Button from "@/components/ui/Button";
import TextInputNLB from "@/components/ui/TextInputNLB";

export default function Home() {
  const emeraldText = "text-emerald-400";
  const grayText = "text-[#5b6c82]";
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">

      {/* Header */}
      <div className="flex flex-col text-center">
        <p className="text-3xl">⚽</p>
        <p className="text-[#5b6c82] text-[14px]">First Drink</p>
        <p className={`${emeraldText} text-[16px]`}>
          <strong>Software Engineering</strong>
        </p>
      </div>

      {/* Login Text */}
      <h1 className="mt-8 mb-4 text-[40px]"><strong>Login</strong></h1>

      {/* login fields */}
      <div className="flex flex-col gap-2 w-full max-w-lg mx-10">
        
        <TextInputNLB placeholder="Username"/>

        <TextInputNLB type="password" placeholder="Password"/>

        <Button children="Login"/>
  
      </div>

      {/* Register page link text */}
      <p className={`${grayText} font-sans mt-2`}>
        New here? <a href="register" className={`${emeraldText}`}>Sign up here</a>
      </p>
      <a className={`${emeraldText}`} href="edit-info">Edit Info page Test</a>
      <a className={`${emeraldText}`} href="admin">Admin page Test</a>
      <a className={`${emeraldText}`} href="info">Info page Test</a>

    </div>
  );
}
