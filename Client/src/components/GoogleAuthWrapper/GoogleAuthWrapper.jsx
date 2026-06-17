import SignIn from '../../pages/Signup/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google'

const GoogleAuthWrapper = () => {
     const clientId = process.env.REACT_APP_CLIENT_ID;
     return (
      <GoogleOAuthProvider clientId={clientId}>
       <SignIn/>
      </GoogleOAuthProvider>
     )
  }

export default GoogleAuthWrapper