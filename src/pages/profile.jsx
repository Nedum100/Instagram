import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from '../constants/routes'
import Header from "../components/header";
import UserProfile from '../components/profile'

export default function Profile () {
    const { username} = useParams()
    const [user, setUser] = useState(null);
    const history = useHistory()

    useEffect(() => {
      async function checkUserExists() {
        const User = await getUserByUsername(username)
        if (User.userId) {
            setUser(user)
        }else {
            history.push(ROUTES.NOT_FOUND) 
        }
    }
    checkUserExists()
    }, [username, history, user]);

    return user ?.username ?  (
        <div className="bg-gray-background">
            <Header />
          <div className="mx-auto max-w-screen-lg">
             <UserProfile username={username} />
          </div>
        </div>
    ) : null
}