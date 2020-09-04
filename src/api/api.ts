import axios from 'axios';

//mongodb+srv://zankdb:<password>@cluster0.dypsb.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb+srv://zankdb:zankSenh@123@cluster0.dypsb.mongodb.net/zankdb?retryWrites=true&w=majority
//zankdb - zankSenh@123
//banco mongodb:sistemas senha:xGhlhQBwawqZWBmD

//mongodb+srv://dbZank:manager@cluster0.dypsb.mongodb.net/dbZank?retryWrites=true&w=majority
//const URL = 'http://localhost:5630';
const URL = 'https://mvsgo-myapp.herokuapp.com';
//vai

const api = () => {
  return axios.create({
    baseURL: URL,
    headers: { 'content-types': 'application/json' },
  });
};

export default api;
