import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { storage } from '../utils/firebase';

const useProfilePicture = (profilePhoto: string | undefined) => {
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchImage = async () => {
      const pathReference = ref(storage, `images/${profilePhoto}`);
      const url = await getDownloadURL(pathReference);
      setPhoto(url);
    };
    fetchImage();
  }, [profilePhoto]);

  if (profilePhoto === null || photo === undefined) {
    return 'https://www.anchormortgagellc.com/wp-content/uploads/2015/09/placeholder.png';
  }
  return photo;
};

export default useProfilePicture;
