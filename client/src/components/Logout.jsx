import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { CurrentUserDataContext } from "../App";
import axios from "axios";

const Logout = () => {
    const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext);
    const history = useHistory();
    useEffect( async ()=> {
        //perform user logout operation
        try {
            const url = "http://localhost:8000/users/logout";
            const serverResponse = await axios.get(url, {withCredentials: true});
            if(serverResponse.status == 200){
                //Current user logout successfully
                setCurrentUserData({...currentUserData, userId: "" , name: "", userLoginStatus: false});
                history.push("/signin");
            }
        } catch (error) {
            //Current user not logout successfully
        }
    }, []);

    return(<></>);
}

export default Logout;