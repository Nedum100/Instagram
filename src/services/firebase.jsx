// eslint-disable-next-line no-unused-vars
import { firebaseApp, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
    const result = await firebaseApp
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get();
  
    return result.docs.length > 0;
  }
export async function getUserByUsername(username) {
    const result = await firebaseApp
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get();
  
    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
  }

export async function getUserByUserId(userId) {
    const result = await firebaseApp
    .firestore()
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
   const result = await firebaseApp
   .firestore()
   .collection('users')
   .limit(10)
   .get()

   return result.docs
   .map ((user) => ({ ...user.data(), docId: user.id }))
   .filter((profile) => profile.userId !== userId && !following(profile.userId))  
   
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId,
    isFollowingProfile){
    return firebaseApp
    .firestore()
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
    return firebaseApp
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
        followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    })
}

export async function getPhotos(userId, following) {
   const result = await firebaseApp
   .firestore()
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
    const result = await firebaseApp
      .firestore()
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