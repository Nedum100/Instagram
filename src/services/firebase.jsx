// eslint-disable-next-line no-unused-vars
import { firebaseApp, FieldValue, db } from "../lib/firebase";
// TODO: See this => https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
// TODO: See this => https://firebase.google.com/docs/firestore/query-data/get-data#before_you_begin
import { doc, query, where, collection, getDocs } from 'firebase/firestore';

export async function doesUsernameExist(username) {
  // const result = await db()
  //   .collection('users')
  //   .where('username', '==', username)
  //   .get();

  // TODO: See this => https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  // FIXME: Permission issues on firebase didn't allow me test this
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });

  // return result.docs.length > 0;
}
export async function getUserByUsername(username) {
    const result = await db()
      .collection('users')
      .where('username', '==', username)
      .get();
  
    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
  }

export async function getUserByUserId(userId) {
    const result = await db()
    .collection('users')
    .where('userId', '==', userId)
    .get()
    
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id 
    }))

    return user
}

// eslint-disable-next-line no-unused-vars
export async function getSuggestedProfiles(userId, following) {
   const result = await db()
   .collection('users')
   .limit(10)
   .get()

   return result.docs
   .map ((user) => ({ ...user.data(), docId: user.id }))
   .filter((profile) => profile.userId !== userId && !following(profile.userId))  
   
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId,
    isFollowingProfile){
    return await db()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
        followers: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    })
}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId,
    isFollowingProfile){
    return await db()
    .collection('users')
    .doc(profileDocId)
    .update({
        followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    })
}

export async function getPhotos(userId, following) {
   const result = await db()
   .collection('photos')
   .where('userId', 'in', following)
   .get()

   const userFollowedPhotos = result.docs.map ((photo) => ({
     ...photo.data(),
     docId: photo.id
   }))

   const photoWitUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) =>{
        let userLikedPhotos = false
        if (photo.likes.includes(userId)){
        userLikedPhotos = true
    }
     const user = await getUserByUserId(photo.userId)
     const { username } = user[0]
     return { username, ...photo, userLikedPhotos}
    })
   )

   return photoWitUserDetails
}

export async function getUserPhotosByUsername(username) {
   const [user] = await getUserByUsername(username)
   const result = await firebaseApp
   .firestore()
   .collection('photos')
   .where('userId', '==', user.userId)
   .get()

   return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
   }))
}

export async function isUserFollowingProfile (loggedInUsername, profileUserId) {
    const result = await db()
      .collection('users')
      .where('username', '==', loggedInUsername)
      .where('following', 'array-contains', profileUserId)
      .get()

      // eslint-disable-next-line no-unused-vars
      const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
      }))
      return response.userId
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileUserId,
  profileDocId,
  followingUserId
) {
   await updateLoggedInUserFollowing(activeUserDocId, profileUserId,
    isFollowingProfile)
   await updateFollowedUserFollowers(profileDocId, followingUserId, 
    isFollowingProfile)
}