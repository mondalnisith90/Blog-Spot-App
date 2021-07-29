import MyBlogBlog from "./MyBlogBlog";
import EditBlog from "./EditBlog";
import CancelIcon from '@material-ui/icons/Cancel';
import "../css/MyBlogs.css";
import { useState, useEffect, useContext } from "react";
import { CurrentUserDataContext } from "../App";
import DefaultPage from "./DefaultPage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';

const MyBlogs = () => {

    const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext);
    //myBlogs means current user all published blogs
    const [myBlogs, setMyBlogs] = useState([]);
    const [blogNotFoundErrorState, setBlogNotFoundErrorState] = useState(false);
    const history = useHistory();
    //Here 'toggler' will use for switching between two different components
    //1. MyBlogBlog.jsx and 2. EditBlog.jsx
    //If toggler=true, then MyBlogBlog.jsx will render, EditBlog.jsx will hide.
    //if toggler=false, then EditBlog.jsx will render, MyBlogBlog.jsx will hide.
    const [toggler, setToggler] = useState(true);
    //Blog Id to be edit in EditBlog.jsx
    const [blogToEdit, setBlogToEdit] = useState("");
    const [progressbarState, setProgressbarState] = useState(false);

    useEffect(()=>{
        //fetch current user all blogs
        fetchBlogsFromServer();
    }, [currentUserData.userId]);

    const fetchBlogsFromServer = async () => {
        //fetch current user blog from server
        setProgressbarState(true);
        try {
            const url = `http://localhost:8000/blog/myblogs?auther_id=${currentUserData.userId}`;
            const serverResponse = await axios.get(url, {withCredentials: true});
            if(serverResponse.status == 200){
                //data is available
                setMyBlogs(serverResponse.data);
                setBlogNotFoundErrorState(serverResponse.data.length==0);
            }
            setProgressbarState(false);
        } catch (error) {
            //Data not available 
            setProgressbarState(false);
            console.log(error.message);
        }
    }

    const viewProfileButtonClick = () => {
        history.push("/my-profile");
    }

  

    return(
        <>
        {currentUserData.userLoginStatus ?
        <>
        <section className="myblogs_root_div">
        <div className="row myblogs_main_div">
        <div className="col-lg-3 col-md-3 col-sm-12 col-12  text-center myblogs_profile_div " > 
         <diV>
              <img src={currentUserData.profileImageUrl} alt="" className="myblogs_profile_pic" />
              <p className="myblogs_profile_name">{currentUserData.name}</p>
              <hr className="myblogs_hr mt-2" />
              <div className="text-start">
              <p className="myblogs_user_info_text">Auther Name: {currentUserData.name}</p>  <hr className="myblogs_hr" />
              <p className="myblogs_user_info_text">Profission: {currentUserData.profission}</p>  <hr className="myblogs_hr" />
               <p className="myblogs_user_info_text">Status: {currentUserData.status}</p>  <hr className="myblogs_hr" />
               <p className="myblogs_user_info_text">Address: {currentUserData.address}</p>  <hr className="myblogs_hr" />
              </div>
              <div className="d-flex justify-content-around align-items-center mt-4">
              <div>
              <button type="button" className="btn btn-outline-success" onClick={viewProfileButtonClick}>View Profile</button>
              </div>
              <div>
              <p  className="myblog_profile_text">Total Blogs: {myBlogs.length}</p>
              </div>
              </div>
              </diV> 
         </div> 

          <div className="col-lg-9 col-md-9 col-sm-12 col-12  myblogs_blog_div"> 
        <div className="mt-5">
          {progressbarState ? <LinearProgress color="secondary" /> : null }
          </div>

          {blogNotFoundErrorState ? <h1 className="myblog_not_found_error">Sorry, You are not published any blog still now...</h1> : null }
         
          {toggler ? 
          <>
           {myBlogs.map( (value, index) => {
              return (<MyBlogBlog setToggler={setToggler} blog={value} key={index} setBlogToEdit={setBlogToEdit} fetchBlogsFromServer={fetchBlogsFromServer}/>);
           })}
          </> : 
            <EditBlog setToggler={setToggler} blogToEdit={blogToEdit}  fetchBlogsFromServer={fetchBlogsFromServer} /> } 

          </div> 
          </div>
        </section>
        </> : <DefaultPage title={"To see your blogs you have to SignUp or Login first."} /> }
       </>
    );
}

export default MyBlogs;