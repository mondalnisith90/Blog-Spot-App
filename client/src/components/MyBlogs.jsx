import MyBlogBlog from "./MyBlogBlog";
import EditBlog from "./EditBlog";
import profilePic from "../images/girl2.jpg";
import "../css/MyBlogs.css";
import { useState } from "react";

const MyBlogs = () => {
    const [state, setState] = useState(true);
    console.log(state)
    return(
        <>
        <section className="myblogs_root_div">
         <div className="row myblogs_main_div">
          <div className="col-lg-3 col-md-3 col-sm-12 col-12  text-center myblogs_profile_div " >
          <div>
              <img src={profilePic} alt="" className="myblogs_profile_pic" />
              <p className="myblogs_profile_name">Gia Karter</p>
              <div className="d-flex justify-content-around align-items-center mt-4">
              <div>
              <button type="button" className="btn btn-outline-success">View Profile</button>
              </div>
              <div>
              <p  className="myblog_profile_text">Total Blogs: 7</p>
              </div>
              </div>
              </div> 
          </div>

          <div className="col-lg-9 col-md-9 col-sm-12 col-12  myblogs_blog_div">
          {state ? <>
            <MyBlogBlog setState={setState} />
            <MyBlogBlog setState={setState} />
            <MyBlogBlog setState={setState} />
            <MyBlogBlog setState={setState} />
            <MyBlogBlog setState={setState} />
            <MyBlogBlog setState={setState} />
            </> : 
            <EditBlog setState={setState} /> }
          </div>

           </div> 


        </section>
       </>
    );
}

export default MyBlogs;