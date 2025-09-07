import { Link } from 'react-router-dom'
import { useGetUserQuery, useUserLogoutMutation } from '../services/apiSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { persistor } from '../app/store'
import { setIsUserLoggedIn } from '../features/auth/signupSlice'
import type { RootState } from '../app/store'
import { memo } from 'react'

type ProfileCardProps = {
  isOpen: boolean;
  toggleProfileCard: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({isOpen, toggleProfileCard}) => {

  const isUserLoggedIn = useSelector((state: RootState) => state.auth.signup.isUserLoggedIn || state.auth.login.isUserLoggedIn)
  const { data: user } = useGetUserQuery(undefined, { skip: !isUserLoggedIn });
  const [logout] = useUserLogoutMutation()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("idToken")
      await logout().unwrap()
      dispatch(setIsUserLoggedIn(false))
      await persistor.purge()
      window.location.href = "/"
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        const err = error as { response?: { data?: { error?: string } }, message?: string };
        console.error("Logout Error:", err.response?.data?.error || err.message);
      } else {
        console.error("Logout Error:", String(error));
      }
    }
  }
	return (
    isOpen && (
    <div className="fixed top-24 left-1/2 sm:left-auto sm:right-10 transform -translate-x-1/2 sm:translate-x-0 z-50 w-[90%] max-w-sm p-6 bg-black border border-gray-700 rounded-3xl shadow-2xl text-white">
      {user ? (
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white text-3xl flex items-center justify-center font-bold">
            {user.name?.charAt(0) || "U"}
          </div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-400 text-sm">{user.phone}</p>
          <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">Let us know who you are</h2>
          <div className="flex justify-center gap-4 mt-4">
            <Link to="/signup"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
              onClick={toggleProfileCard}
            >
              Signup
            </Link>
            <Link to="/login"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
              onClick={toggleProfileCard}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  ));
}

export default memo(ProfileCard)