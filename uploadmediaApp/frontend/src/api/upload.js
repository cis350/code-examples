import axios from 'axios';
import DEFAULT_URL from '../utils/utils';

const uploadFile = async (files) => {
    try {
        const res = await axios.post(DEFAULT_URL, files, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(`Upload sucessful ${res}`);
      } catch (err) {
        console.err(err.message);
      }
}

export default uploadFile;