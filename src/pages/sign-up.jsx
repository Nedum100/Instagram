/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect} from "react"
import { Link, useNavigate} from "react-router-dom"
import { FirebaseContext } from "../context/firebase"
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from "../services/firebase";
import { firebaseApp } from "../lib/firebase";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export default function Signup() {
    const navigate = useNavigate(); 
    const { firebase } = useContext(FirebaseContext);

    const [ username, setUsername] = useState('')
    const [ fullname, setFullname] = useState('')

    const [ emailAddress, setEmailAddress] = useState('')
    const [ password, setPassword] = useState('')


    const [ error, setError] = useState('')
    const isInvalid = password === '' || emailAddress === ''

   const handleSignup =async (event) => {
      event.preventDefault()

   const usernameExists = await doesUsernameExist(username);

    if (!usernameExists) {
      try {
        // NOTE: The API for this has changed. see here => https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
        const createdUserResult = await createUserWithEmailAndPassword(
          getAuth(),
          emailAddress,
          password
        );

        // Update user profile with the username
        // Also, NOTE: The API has changed too. 😂 https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
        await updateProfile(getAuth().currentUser, {
          displayName: username,
        });

        // firebase user collection (create a document)
        await firebaseApp.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        navigate.push(ROUTES.DASHBOARD);
      } catch (error) {
          setFullname('');
          setEmailAddress('');
          setPassword('');
          setError(error.message);
        }
      } else {
        setError('That username is already taken, please try another.');
        }
      }

   useEffect(() => {
     document.title = 'Sign Up - Instagram'
   }, []);

    return (
        <div className="container flex mx-auto
         max-w-screen-md items-center h-screen">
           <div className="flex w-3/5">
             <img 
                src="/images/iphone-with-profile.jpg" 
                alt="iphone with Instagram app" 
             />
            </div>
            <div className="flex flex-col w-2/5">
              <div className="flex flex-col items-center bg-white p-4 border 
               border-gray-primary mb-4 rounded">
              <h1 className="flex justfy-center w-full">
                <img src="/images/logo.png" alt="instagram" 
                 className="mt-2 w-6/12 mb-4"/>
              </h1>

               {error && <p className =" mb-4 text-xs text-red-primary">{error}</p>}

               <form onSubmit={handleSignup} method="POST">
                 <input 
                   aria-label="Enter your username"
                   type="text"
                   placeholder="username"
                   className="text-sm text-gray-base w-full 
                    mr-3 py-5 px-4 h-2 border-gray-primary
                    rounded mb-2"
                    onChange={({ target }) => setUsername(target.value)}
                    value={username}
                 />
                 <input 
                   aria-label="Enter your fullname "
                   type="text"
                   placeholder="Full Name"
                   className="text-sm text-gray-base w-full 
                    mr-3 py-5 px-4 h-2 border-gray-primary
                    rounded mb-2"
                    onChange={({ target }) => setFullname(target.value)}
                    value={fullname}
                 />
                  <input 
                   aria-label="Enter your email address"
                   type="text"
                   placeholder="Email address"
                   className="text-sm text-gray-base w-full 
                    mr-3 py-5 px-4 h-2 border-gray-primary
                    rounded mb-2"
                    onChange={({ target }) => setEmailAddress(target.value)}
                    value={emailAddress}
                 />
                 <input 
                   aria-label="Enter your password "
                   type="password"
                   placeholder="password"
                   className="text-sm text-gray-base w-full 
                    mr-3 py-5 px-4 h-2 border-gray-primary
                    rounded mb-2"
                    onChange={({ target }) => setPassword(target.value)}
                    value={password}
                 />
                 <button
                   disabled={isInvalid}
                   type="submit"
                   className={`bg-blue-medium text-white
                    w-full rounded h-8 font-bold
                    ${isInvalid && ' opacity-50'}`}
                    >
                    Sign Up
                   </button>
               </form>
             </div>
             <div className="flex justify-center items-center 
               flex-col w-full bg-white p-4 rounded border border-gray-primary">
                <p className="text-sm">have an account?{``}
                  <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                    Login
                  </Link>
                </p>
             </div>
            </div>
        </div>
    )
}