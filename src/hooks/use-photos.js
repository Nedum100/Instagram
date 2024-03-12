import { useState, useEffect, useContext } from "react";
import userContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const { user: { uid: userId = "" } = {} } = useContext(userContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      // Do something with followedUserPhotos if needed
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      // Set the state with the fetched photos
      setPhotos(followedUserPhotos);
    }

    // Call the function when the component mounts or userId changes
    getTimelinePhotos();
  }, [userId]); // Add userId as a dependency to rerun the effect when it changes

  // Optionally return photos or any other data needed
  return photos;
}
