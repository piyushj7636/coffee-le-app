import { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/coffee_le_logo.jpg'
import { HiChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useVerifyLoginMutation } from '../../services/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store'
import { browserLocalPersistence, RecaptchaVerifier, setPersistence, signInWithPhoneNumber } from 'firebase/auth';
import {
  setIsSendingOtp,
  setIsVerifyingOtp,
  setIsUserLoggedIn
} from "../../features/auth/loginSlice";
import { auth } from '../../firebase';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: any;
  }
}
const OTP_LENGTH = 6;

const Login = () => {
	const navigate = useNavigate();
  const [login] = useLoginMutation()
  const [verifyLogin] = useVerifyLoginMutation()
  const otpInputs = useRef<(HTMLInputElement | null)[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const [step, setStep] = useState('enterPhone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""])
  const {
    isSendingOtp,
    isVerifyingOtp,
    isUserLoggedIn
  } = useSelector((state: RootState) => state.auth.login)

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible", // or 'normal'
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          }
        }
      );
      window.recaptchaVerifier.render()
    }
  };
  
  useEffect(() => {
    setupRecaptcha()
  }, []);

  const handleSendOtp = async () => {
    dispatch(setIsSendingOtp(true));
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    try {
      if (!window.recaptchaVerifier) {
        throw new Error("RecaptchaVerifier not initialized.");
      }
      await setPersistence(auth, browserLocalPersistence);
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      window.confirmationResult = confirmation;
      await login({ phone: formattedPhone }).unwrap();
      setStep("verifyOtp")
      
    } catch (error) {
      console.error("Error sending OTP: ", error);
      alert("Failed to send OTP. Please check your phone number and try again.");
    } finally {
      dispatch(setIsSendingOtp(false));
    }
  }
  
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otpArray];
    newOtp[idx] = value.slice(-1);
    setOtpArray(newOtp)
    if (value && idx < OTP_LENGTH - 1) {
      otpInputs.current[idx + 1]?.focus();
    }
    setOtp(newOtp.join(""));
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otpArray[idx] && idx > 0) {
      otpInputs.current[idx - 1]?.focus();
    }
  }

  const handleVerifyOtp = async () => {
      dispatch(setIsVerifyingOtp(true));
      try {
        const result = await window.confirmationResult.confirm(otp);
        const user = result.user;
        const idToken = await user.getIdToken();
        await verifyLogin({ otp, idToken }).unwrap();
        // const userRes = userData
        localStorage.setItem("idToken", idToken);
        navigate("/");
        // You may want to reset state on successful signup here
      } catch (error) {
        console.error("Error verifying OTP: ", error);
      } finally {
        dispatch(setIsVerifyingOtp(false))
        dispatch(setIsUserLoggedIn(true))
      }
    };

	return (
		<>
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate("/")}
          aria-label="Go back to homepage"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <HiChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="mb-10">
          <img src={Logo} alt="Nava Cloth Logo" className="h-24 w-auto" ></img>
        </div>
        <div className="bg-gray-800 text-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          {step === "enterPhone" && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-2">Welcome 👋</h2>
              <p className="text-center text-gray-400 mb-6">Login with your phone number</p>

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                disabled={isSendingOtp}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />

              <button
                onClick={handleSendOtp}
                disabled={isSendingOtp}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-xl font-semibold"
              >
                {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </>
          )}

          {step === "verifyOtp" && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-2">Verify Login 🔐</h2>
              <p className="text-center text-gray-400 mb-6">
                Enter the OTP sent to your phone
              </p>

              <div className="flex sm:justify-between justify-center sm:gap-2 gap-1 mb-4">
                {otpArray.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={el => otpInputs.current[idx] = el}
                    onChange={e => handleOtpChange(e, idx)}
                    onKeyDown={e => handleOtpKeyDown(e, idx)}
                    className="w-10 sm:w-12 h-12 text-center text-2xl rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus={idx === 0}
                    autoComplete={idx === 0 ? "one-time-code" : undefined}
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className={`w-full bg-blue-600 transition-all py-3 rounded-xl font-semibold ${otp.length !== 6 ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}
              >
                {isVerifyingOtp ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
            </>
          )}
        </div>
      </div>
			<div id="recaptcha-container"></div>
    </>
	)
}

export default Login