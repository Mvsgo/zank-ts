import axios from 'axios';
import { useAuth } from 'src/context/AuthContext';

const URL = 'https://mvsgo-myapp.herokuapp.com';

//toda function que tem mais de uma sub function tem que iniciar com useXXXX
const useApi = () => {
  const { access_token } = useAuth();

  const Api = () => {
    console.log('access_token = ', access_token);

    return axios.create({
      baseURL: URL,
      headers: { 'content-types': 'application/json', Authorization: `Bearer ${access_token}` },
    });
  };

  const ApiWhitoutToken = () => {
    return axios.create({
      baseURL: URL,
    });
  };

  return {
    Api,
    ApiWhitoutToken,
  };
};

export default useApi;

// /*mongodb+srv://zankdb:<password>@cluster0.dypsb.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://zankdb:zankSenh@123@cluster0.dypsb.mongodb.net/zankdb?retryWrites=true&w=majority
// zankdb - zankSenh@123
// banco mongodb:sistemas senha:xGhlhQBwawqZWBmD
// mongodb+srv://dbZank:manager@cluster0.dypsb.mongodb.net/dbZank?retryWrites=true&w=majority
// const URL = 'http://localhost:5630';*/
