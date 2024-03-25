// eslint-disable-next-line no-unused-vars
import { firebaseApp, FieldValue, db } from "../lib/firebase";
import { getDocs, query, collection, where, limit, doc, 
  arrayRemove, arrayUnion, updateDoc,  } from "firebase/firestore";
// import { doc, query, where, collection, getDocs } from 'firebase/firestore';

export async function doesUsernameExist(username) {
  const result = await getDocs(collection(db, "users"));
  return result.docs.some(doc => doc.data().username === username);
}

export async function getUserByUsername(username) {
  const querySnapshot = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
}

// eslint-disable-next-line no-unused-vars
export async function getUserByUserId(userId) {
  const result = await getDocs(collection(db, "users"));

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

// eslint-disable-next-line no-unused-vars
export async function getSuggestedProfiles(userId, following) {
  const result = await getDocs(collection(db, "users"), limit(10));
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following(profile.userId));
}


export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
  const docRef = doc(db, "users", loggedInUserDocId);
  const fieldPath = "followers";
  
  let updateObj = {};
  if (isFollowingProfile) {
    updateObj[fieldPath] = arrayRemove(profileId);
  } else {
    updateObj[fieldPath] = arrayUnion(profileId);
  }
  
  await updateDoc(docRef, updateObj);
}


export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {
  const docRef = doc(db, "users", profileDocId);
  const fieldPath = "followers";
  
  let updateObj = {};
  if (isFollowingProfile) {
    updateObj[fieldPath] = arrayRemove(loggedInUserDocId);
  } else {
    updateObj[fieldPath] = arrayUnion(loggedInUserDocId);
  }
  
  await updateDoc(docRef, updateObj);
}


export async function getPhotos(userId, following) {
  const querySnapshot = await getDocs(query(collection(db, 'photos'), where('userId', 'in', following)));
  const userFollowedPhotos = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhotos = false;
      if (photo.likes.includes(userId)) {
        userLikedPhotos = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhotos };
    })
  );
  return photoWithUserDetails;
}


export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const querySnapshot = await getDocs(query(collection(db, 'photos'), where('userId', '==', user.userId)));
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
}


export async function isUserFollowingProfile(loggedInUsername, profileUserId) {
  const querySnapshot = await getDocs(query(collection(db, 'users'), where('username', '==', loggedInUsername), where('following', 'array-contains', profileUserId)));
  const [response = {}] = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return response.userId;
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