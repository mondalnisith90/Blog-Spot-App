import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import CreateBlog from './components/CreateBlog';
import React from 'react';
import MyBlogs from './components/MyBlogs';
import BlogPage from './components/BlogPage';
import MyProfile from './components/MyProfile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Logout from './components/Logout';
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import defaultProfilePic from './Data/ProjectData';
import './App.css';


const CurrentUserDataContext = React.createContext();

const App = () => {
  //userLoginStatus: false means user is not login; if true then user already loged In
  const [currentUserData, setCurrentUserData] = useState({userLoginStatus: false, userId: "" , name: "", profission: "", status: "", address: "",  profileImageUrl: defaultProfilePic });

  useEffect( async ()=>{
    console.log("use effect is called blog-spot")
    try {
      const url = "http://localhost:8000/users/data";
      const serverResponse = await axios.get(url, {withCredentials: true});
      if(serverResponse.status == 200){
        //Current user is already loged In
        const data = serverResponse.data;
        setCurrentUserData({
          userLoginStatus: true,
          userId: data.id,
          name: data.name,
          profission: data.profission,
          status: data.status,
          address: data.address,  
          profileImageUrl: data.profie_pic=="default" ? defaultProfilePic : data.profie_pic
        });
      }
    } catch (error) {
      //Current user is not loged In
      setCurrentUserData({...currentUserData, userLoginStatus: false});
    }
  }, [currentUserData.userLoginStatus]);



  const [count, setCount] = useState(100);
  return(
    <>
     <CurrentUserDataContext.Provider value={{currentUserData, setCurrentUserData}}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-blog" component={CreateBlog} />
        <Route exact path="/my-blog" component={MyBlogs} />
        <Route exact path="/single-blog/:blogId" component={BlogPage} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
      </CurrentUserDataContext.Provider>
    </>
  );
}

export default App;
export  {CurrentUserDataContext};
