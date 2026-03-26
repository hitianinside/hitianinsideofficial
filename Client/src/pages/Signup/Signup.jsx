import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from '@react-oauth/google'
import googleAuth from "../../api/googleapi";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { isAuthenticatedContext } from "../../context/context";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const SignUp = () => {

  const { setIsAuthenticated } = useContext(isAuthenticatedContext);
  const navigate = useNavigate();

  //Google response
  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult['code']);
        const { email, name, image } = await result.data.user;
        const token = await result.data.token;
        //newUser
        localStorage.setItem('user-info', JSON.stringify({ email, name, image, token }))
        setIsAuthenticated(true);
        navigate('/profile');
        toast.success("sign in successfully");
      }
    } catch (error) {
      toast.error("server error, try again later");
    }
  }

  //auth-code
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#3b0000] via-[#650808] to-[#a00000] flex items-center justify-center overflow-hidden text-white">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-[30rem] h-[30rem] bg-red-600 rounded-full blur-3xl top-[-6rem] left-[-6rem]"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-[32rem] h-[32rem] bg-[#ff4040] rounded-full blur-3xl bottom-[-8rem] right-[-8rem]"
      ></motion.div>

      {/* Center Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-xl backdrop-blur-xl bg-white/10 p-10 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] text-center"
      >
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-wide"
        >
          Join the Official e-Media Club
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl opacity-90 max-w-sm mx-auto"
        >
          A community of creators capturing emotions & crafting digital stories.
        </motion.p>

        {/* Google Sign in Button */}
        <motion.button
          whileHover={{ scale: 1.07, boxShadow: "0px 0px 35px rgba(255,80,80,0.6)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250 }}
          onClick={googleLogin}
          className="mt-10 w-full max-w-sm mx-auto flex items-center justify-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff5a5a] to-[#d41717] font-bold text-lg shadow-xl border border-white/20"
        >
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
            <FcGoogle className="h-6 w-6" />
          </div>
          Sign in with Google
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm opacity-80"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
}

export default SignUp;