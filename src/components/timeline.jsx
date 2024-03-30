import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

import { getAuth } from 'firebase/auth';

export default function Timeline() {
  const photosResult = usePhotos();
  // NOTE: Below is how you get a current loggedin user. See this => https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
  console.log(getAuth().currentUser);

  // Check if photos is null
  if (photosResult === null) {
    return <Skeleton count={4} width={640} height={500} className="mb-5" />;
  }

  // Destructure photos if it's not null
  const { photos } = photosResult;

  return (
    <div className="container col-span-2">
      {photos?.length ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
