import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { sendPasswordResetEmail, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../lib/firebase";

type LoginType = "selection" | "student" | "faculty" | "coordinator";

export function LoginPage() {
  const [loginType, setLoginType] = useState<LoginType>("selection");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [loginError, setLoginError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setResetMessage("");
    setResetError("");

    if (!identifier.trim()) {
      setLoginError("Please enter your identifier.");
      return;
    }

    if (loginType === "student" && !identifier.trim().toUpperCase().startsWith("1BM")) {
      setLoginError("Student USN must start with '1BM'.");
      return;
    }

    if (!password || password.length < 6) {
      setLoginError("Password must be at least 6 characters.");
      return;
    }

    let emailToLogin = identifier.trim();
    if (loginType === "faculty" || loginType === "coordinator") {
      if (!emailToLogin.includes("@")) {
        emailToLogin = `${emailToLogin}@bmsce.ac.in`;
      }
    } else if (loginType === "student" && !emailToLogin.includes("@")) {
      emailToLogin = `${emailToLogin}@bmsce.ac.in`;
    }

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, emailToLogin, password);
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      setLoginError(error.message || "Failed to sign in. Please check your credentials.");
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setResetMessage("");
    setResetError("");

    if (!identifier) {
      setResetError("Please enter your USN or Email Username first.");
      return;
    }

    if (loginType === "student" && !identifier.trim().toUpperCase().startsWith("1BM")) {
      setResetError("Student USN must start with '1BM'.");
      return;
    }

    let emailToReset = identifier;
    if (loginType === "faculty" || loginType === "coordinator") {
      emailToReset = `${identifier}@bmsce.ac.in`;
    } else if (loginType === "student" && !identifier.includes("@")) {
      emailToReset = `${identifier}@bmsce.ac.in`;
    }

    try {
      await sendPasswordResetEmail(auth, emailToReset);
      setResetMessage(`Password reset email sent to ${emailToReset}`);
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setResetError(error.message || "Failed to send password reset email.");
    }
  };

  const renderSelection = () => (
    <div className="w-full max-w-md">
      <h1 className="text-[28px] font-medium text-[#0a2351] dark:text-white mb-2">Welcome to BMSCE CAMPUS</h1>
      <p className="text-[#8e9cae] dark:text-gray-400 mb-8 text-[15px]">
        To keep connected with us please login with your personal credentials
      </p>

      <div className="space-y-4 mb-10">
        <button
          onClick={() => setLoginType("student")}
          className="w-full py-2.5 px-4 border border-[#0d6efd] text-[#0d6efd] rounded hover:bg-[#0d6efd]/5 transition-colors text-[15px]"
        >
          Student Sign In
        </button>
        <button
          onClick={() => setLoginType("faculty")}
          className="w-full py-2.5 px-4 border border-[#dc3545] text-[#dc3545] rounded hover:bg-[#dc3545]/5 transition-colors text-[15px]"
        >
          Faculty Sign In
        </button>
        <button
          onClick={() => setLoginType("coordinator")}
          className="w-full py-2.5 px-4 border border-[#198754] text-[#198754] rounded hover:bg-[#198754]/5 transition-colors text-[15px]"
        >
          Coordinator Sign In
        </button>
      </div>

      <div className="text-[15px] text-[#0a2351] dark:text-white font-medium">
        If any queries or issues kindly contact<br />
        <a href="mailto:campus@bmsce.ac.in" className="text-[#e83e8c] hover:underline">campus@bmsce.ac.in</a>
      </div>
    </div>
  );

  const renderForm = () => {
    let title = "";
    let identifierLabel = "";
    let identifierPlaceholder = "";
    let showDomain = false;

    if (loginType === "student") {
      title = "Student Sign In";
      identifierLabel = "USN";
      identifierPlaceholder = "Enter USN";
    } else if (loginType === "faculty") {
      title = "Faculty Sign In";
      identifierLabel = "Email address";
      identifierPlaceholder = "Faculty Username";
      showDomain = true;
    } else if (loginType === "coordinator") {
      title = "Feedback Coordinator Sign In";
      identifierLabel = "Email address";
      identifierPlaceholder = "Enter Email Username";
      showDomain = true;
    }

    return (
      <div className="w-full max-w-md">
        <button 
          onClick={() => {
            setLoginType("selection");
            setResetMessage("");
            setResetError("");
            setLoginError("");
            setIdentifier("");
            setPassword("");
            setShowPassword(false);
            setRememberMe(false);
          }}
          className="flex items-center text-[#6c757d] hover:text-[#0a2351] dark:hover:text-white mb-6 transition-colors text-[14px]"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </button>
        
        <h1 className="text-[28px] font-medium text-[#0a2351] dark:text-white mb-1">{title}</h1>
        <p className="text-[#8e9cae] dark:text-gray-400 mb-8 text-[15px]">
          login into BMSCE campus
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[14px] text-[#212529] dark:text-gray-300 mb-1.5">
              {identifierLabel}
            </label>
            <div className="flex">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={identifierPlaceholder}
                className={`w-full px-3 py-2 border border-[#ced4da] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#495057] dark:text-white focus:outline-none focus:border-[#86b7fe] focus:ring-1 focus:ring-[#86b7fe] transition-all text-[15px] placeholder-[#6c757d] ${showDomain ? 'rounded-l border-r-0' : 'rounded'}`}
              />
              {showDomain && (
                <div className="flex items-center px-3 border border-l-0 border-[#ced4da] dark:border-slate-700 rounded-r bg-[#e9ecef] dark:bg-slate-700 text-[#495057] dark:text-gray-300 text-[15px]">
                  @bmsce.ac.in
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[14px] text-[#212529] dark:text-gray-300">
                Password
              </label>
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-[14px] text-[#0d6efd] hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-[#ced4da] dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-[#495057] dark:text-white focus:outline-none focus:border-[#86b7fe] focus:ring-1 focus:ring-[#86b7fe] transition-all text-[15px] placeholder-[#6c757d] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-[#0a2351] focus:ring-[#86b7fe] border-[#ced4da] rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-[14px] text-[#212529] dark:text-gray-300">
              Remember me
            </label>
          </div>

          {resetMessage && (
            <div className="text-[14px] text-green-600 dark:text-green-400">
              {resetMessage}
            </div>
          )}
          {resetError && (
            <div className="text-[14px] text-red-600 dark:text-red-400">
              {resetError}
            </div>
          )}
          {loginError && (
            <div className="text-[14px] text-red-600 dark:text-red-400">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#0a2351] hover:bg-[#0a2351]/90 text-white rounded transition-colors text-[15px] mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-[15px] text-[#0a2351] dark:text-white font-medium">
          If any queries or issues kindly contact<br />
          <a href="mailto:campus@bmsce.ac.in" className="text-[#e83e8c] hover:underline">campus@bmsce.ac.in</a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="py-4 px-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
        <Link to="/" className="flex items-center text-[22px] font-bold text-[#0a2351] dark:text-white tracking-tight">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/BMS_College_of_Engineering.svg/1200px-BMS_College_of_Engineering.svg.png" 
            alt="BMSCE Logo" 
            className="h-8 w-8 mr-2 object-contain"
            referrerPolicy="no-referrer"
          />
          BMSCE<span className="text-[#0d6efd] font-normal">CAMPUS</span>
        </Link>
        <Link to="/" className="px-5 py-1.5 border-2 border-[#0d6efd] bg-[#0d6efd] text-white rounded hover:bg-[#0b5ed7] hover:border-[#0b5ed7] transition-colors text-[13px] font-bold tracking-wider">
          WEBSITE
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Illustration Side */}
          <div className="hidden md:flex flex-1 justify-center">
            {loginType === "selection" ? (
              <img 
                src="https://illustrations.popsy.co/amber/team-building.svg" 
                alt="Team Collaboration" 
                className="w-full max-w-[450px]"
              />
            ) : (
              <img 
                src="https://illustrations.popsy.co/amber/work-from-home.svg" 
                alt="Login Illustration" 
                className="w-full max-w-[450px]"
              />
            )}
          </div>

          {/* Form Side */}
          <div className="flex-1 flex justify-center md:justify-start">
            {loginType === "selection" ? renderSelection() : renderForm()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-8 border-t border-gray-100 dark:border-slate-800 text-[11px] text-[#6c757d] flex justify-between items-center uppercase tracking-wider">
        <div>© 2020 BMSCE CAMPUS V1.0.0.</div>
        <div>DEVELOPED BY <span className="text-[#e83e8c]">SARIM ALI</span></div>
      </footer>
    </div>
  );
}
