export default function Home() {
  const yellowText = "text-[#f0990d]";
  const grayText = "text-[#5b6c82]";
  const box_sizing = "py-3 w-72 px-4 mt-2 rounded";
  const inputField = "focus:outline-none focus:ring-0 focus:border-transparent"
  const inputBg = "bg-[#1c1f2e]";
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-mono">

      {/* Header */}
      <div className="flex flex-col text-center">
        <div className="text-3xl">⚽</div>
        <div className="text-[#5b6c82] text-[14px]">
          First Drink
        </div>
        <div className={`${yellowText} text-[16px]`}>
          <strong>Software Engineering</strong>
        </div>
      </div>

      {/* Login Text */}
      <div className="mt-8 mb-4 text-[40px]"> <strong>Login</strong> </div>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Username"
        className={`${inputBg} ${box_sizing} ${inputField}`}
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        className={`${inputBg} ${box_sizing} ${inputField}`}
      />

      {/* Login Button */}
      <button className=
        {`bg-[#f0990d]
          hover:bg-[#de8d0b]
          text-[#0b0b0f]
          font-bold
          ${box_sizing}`}
      >
        Login
      </button>

      {/* Register page link text */}
      <div className={`${grayText} font-sans mt-2`}>
        New here? <a href="register" className={`${yellowText}`}>Sign up here</a>
      </div>

      <div className={`${yellowText}`}><a href="edit-info">Edit Info page Test</a></div>
      <div className={`${yellowText}`}><a href="admin">Admin page Test</a></div>
      <div className={`${yellowText}`}><a href="info">Info page Test</a></div>

    </div>
  );
}
