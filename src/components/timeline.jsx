import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  const photosResult = usePhotos();
  
  // Check if photos is null
  if (photosResult === null) {
    return <Skeleton count={4} width={640} height={500} className='mb-5' />;
  }

  // Destructure photos if it's not null
  const { photos } = photosResult;

  return (
    <div className="container col-span-2">
      {photos?.length ? (
        photos.map((content) => (
          <Post key={content.docId} content={content} />
        ))
      ) : (
        <p className='text-center text-2xl'>Follow people to see photos</p>
      )}
    </div>
  );
}
