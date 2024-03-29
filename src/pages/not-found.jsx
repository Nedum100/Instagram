import {useEffect} from 'react'
import Header from '../components/header'

export default function NotFound(){
    useEffect(() => {
      return () => {
        document.title = 'Not Found'
      };
    }, []);
    
    return(
        <div className="bg-gray-background">
          <Header />
           <div className="max-auth max-w-screen-lg">
            <p className="text-center text-2xl">Not Found!</p>
           </div>
        </div>
    )
}