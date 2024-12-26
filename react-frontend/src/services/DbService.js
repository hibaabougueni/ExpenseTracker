import axios from "axios";

const DB_USERS_API = "http://localhost:8081/api/v1/users/list"

class DbService {
  
    

    getUsers(){
        return axios.get(DB_USERS_API)
    }

    addUsers(users){
        return axios.post(DB_USERS_API,users);
    }

}

export default new DbService()