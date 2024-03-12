// eslint-disable-next-line no-unused-vars
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'

export default function Sidebar () {
    const {
        // eslint-disable-next-line no-unused-vars
        user: { docId, fullName, username, userId, following}
    } = useUser()

    return <div className="p-4">
      <User username={username} fullName={fullName}/>
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/> 
    </div>
}

