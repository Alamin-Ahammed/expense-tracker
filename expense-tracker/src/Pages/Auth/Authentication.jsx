import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Config/firebase-config";

export default function Authentication() {
  const navigate = useNavigate()
  const handleGoogleAuth = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userId : result.user.uid,
      name : result.user.displayName,
      email : result.user.email,
      Profilephoto : result.user.photoURL,
      isAuth : true
    }
    localStorage.setItem('auth', JSON.stringify(authInfo))
    navigate('/expense-tracker')
  };
  return (
    <div>
      <p>Sign in with google to continue</p>
      <button onClick={handleGoogleAuth}>Sign In With Google</button>
    </div>
  );
}
