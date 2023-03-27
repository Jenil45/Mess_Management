import useAuth from "./useAuth"
import axios, { axiosPrivate } from '../Api/axios.js'

const useRefresh = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {

        // refresh backend side
        const response = await axiosPrivate.get("/auth/refresh" , {
            withCredntials:true
        })
        // console.log(response);
        setAuth(prev => {
                return {...prev ,"userId":response.data.userId,"name":response.data.name,"email":response.data.email ,"mobileno":response.data.mobileno, "role":response.data.role, "accessToken":response.data.accessToken}
            });
    }
    return refresh;
}

export default useRefresh;