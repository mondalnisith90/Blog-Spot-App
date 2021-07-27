import MyBlogBlog from "./MyBlogBlog";
import EditBlog from "./EditBlog";
import CancelIcon from '@material-ui/icons/Cancel';
import "../css/MyBlogs.css";
import { useState, useEffect, useContext } from "react";
import { CurrentUserDataContext } from "../App";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MyBlogs = () => {

    const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext);
    //myBlogs means current user all published blogs
    const [myBlogs, setMyBlogs] = useState([]);
    const history = useHistory();
    //Here 'toggler' will use for switching between two different components
    //1. MyBlogBlog.jsx and 2. EditBlog.jsx
    //If toggler=true, then MyBlogBlog.jsx will render, EditBlog.jsx will hide.
    //if toggler=false, then EditBlog.jsx will render, MyBlogBlog.jsx will hide.
    const [toggler, setToggler] = useState(true);
    //Blog Id to be edit in EditBlog.jsx
    const [blogToEdit, setBlogToEdit] = useState("");

    useEffect(()=>{
        //fetch current user all blogs
        fetchBlogsFromServer();
    }, [currentUserData.userId]);

    const fetchBlogsFromServer = async () => {
        //fetch current user blog from server
        try {
            console.log("currentUserData.userId ",currentUserData.userId);
            const url = `http://localhost:8000/blog/myblogs?auther_id=${currentUserData.userId}`;
            const serverResponse = await axios.get(url, {withCredentials: true});
            if(serverResponse.status == 200){
                //data is available
                setMyBlogs(serverResponse.data);
            }
        } catch (error) {
            //Data not available 
            console.log(error.message);
        }
    }

    const viewProfileButtonClick = () => {
        history.push("/my-profile");
    }

  

    return(
        <>
        <section className="myblogs_root_div">
         <div className="row myblogs_main_div">
          <div className="col-lg-3 col-md-3 col-sm-12 col-12  text-center myblogs_profile_div " >
          <div>
              <img src={currentUserData.profileImageUrl} alt="" className="myblogs_profile_pic" />
              <p className="myblogs_profile_name">{currentUserData.name}</p>
              <hr className="myblogs_hr mt-2" />
              <div className="text-start">
              <p className="myblogs_user_info_text">Name: {currentUserData.name}</p>  <hr className="myblogs_hr" />
              <p className="myblogs_user_info_text">Profission: {currentUserData.profission}</p>  <hr className="myblogs_hr" />
               <p className="myblogs_user_info_text">Status: {currentUserData.status}</p>  <hr className="myblogs_hr" />
               <p className="myblogs_user_info_text">Address: {currentUserData.address}</p>  <hr className="myblogs_hr" />
              </div>
              <div className="d-flex justify-content-around align-items-center mt-4">
              <div>
              <button type="button" className="btn btn-outline-success" onClick={viewProfileButtonClick}>View Profile</button>
              </div>
              <div>
              <p  className="myblog_profile_text">Total Blogs: 7</p>
              </div>
              </div>
              </div> 
          </div>

          <div className="col-lg-9 col-md-9 col-sm-12 col-12  myblogs_blog_div">
          {toggler ? 
          <>
           {myBlogs.map( (value, index) => {
              return (<MyBlogBlog setToggler={setToggler} blog={value} key={index} setBlogToEdit={setBlogToEdit} />);
           })}
          </> : 
            <EditBlog setToggler={setToggler} blogToEdit={blogToEdit} /> }
          </div>
           </div> 
        </section>
       </>
    );
}

export default MyBlogs;