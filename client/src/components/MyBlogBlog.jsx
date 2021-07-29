import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { useContext } from 'react';
import { CurrentUserDataContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import "../css/MyBlogBlog.css";


const reactToastStyle = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  };


const MyBlogBlog = ({setToggler, blog, setBlogToEdit, fetchBlogsFromServer}) => {

  const {currentUserData, setCurrentUserData} = useContext(CurrentUserDataContext);
  const currentUserId = currentUserData.userId;
  //Blog published date. Convert ISO time zone to normal date
  const date = new Date(blog.publish_date);
  const blogEditIconClick = () => {
    //set blog to edit
    setBlogToEdit(blog);
    //Hide MyBlogBlog.jsx and show or render EditBlog.jsx
    setToggler(false);

  }


  const deleteBlogButtonClick = async () => {
    const value = window.confirm("Are you sure to delete this blog? If you press OK then blog will be deleted permanently.");
    if(value){
      //user press ok to delete this blog
      //Now delete this blog from server
      try {
        const url = `http://localhost:8000/blog?blogId=${blog._id}&&uid=${currentUserId}`;
        const serverResponse = await axios.delete(url, {withCredentials: true});
        if(serverResponse.status == 200){
          //Blog delete successfully
          toast.success("Blog deleted successfully", reactToastStyle);
          //Blog deleted successfully. So again fetch all blogs of this current user from server to see changes
          //This fetchBlogsFromServer() method is belong to MyBlogs.jsx component
          fetchBlogsFromServer();
        }
      } catch (error) {
        //Blog not delete
        toast.error("Blog not delete", reactToastStyle);
      }
    }
  }

    return(
        <>
        <div className="my-5">
          <ToastContainer />
          <img src={blog.blog_image} alt="" className="myblogblog_blog_image" />
          <div className="myblogblog_blog_body">
            <div className="row myblogblog_body_header_div d-flex justify-content-between">
            <div className="col-md-4 col-sm-4 col-12 order-sm-1 order-2">
            <p className="myblogblog_auther_name_text">Category: {blog.catogery}</p>
            </div>
            <div  className="col-md-4 col-sm-4 col-12 text-sm-center text-center mb-2  order-sm-2 order-1">
              <Tooltip title="Edit blog">
              <EditIcon className="myblogblog_edit_icon" onClick={blogEditIconClick}/>
              </Tooltip>
                <Tooltip title="Delete blog">
                <DeleteIcon className="myblogblog_delete_icon" onClick={deleteBlogButtonClick} />
                </Tooltip>
               
            </div>
            <div  className="col-md-4 col-sm-4 col-12  order-sm-3 order-3">
              <p className="myblogblog_published_date_text">Publish on  {`  ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}</p>
            </div>
            </div>
            <h2 className="myblogblog_blog_title">{blog.title}</h2>
            <p className="myblogblog_blog_description">
             {blog.body}
            </p>
          </div>
          </div>
        </>
    );
}

export default MyBlogBlog;