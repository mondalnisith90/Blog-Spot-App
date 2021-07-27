import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import "../css/MyBlogBlog.css";


const MyBlogBlog = ({setToggler, blog, setBlogToEdit}) => {

  const blogEditIconClick = () => {
    //set blog to edit
    setBlogToEdit(blog);
    //Hide MyBlogBlog.jsx and show or render EditBlog.jsx
    setToggler(false);

  }


  const deleteBlogButtonClick = () => {
    const value = window.confirm("Are you sure to delete this blog? If you press OK then blog will be deleted permanently.");
    if(value){
      //user press ok to delete this blog
      //Now delete this blog from server
    }
  }

    return(
        <>
        <div className="my-5">
          <img src={blog.blog_image} alt="" className="myblogblog_blog_image" />
          <div className="myblogblog_blog_body">
            <div className="myblogblog_body_header_div d-flex justify-content-between">
            <div>
            <p className="myblogblog_auther_name_text">Category: {blog.catogery}</p>
            </div>
            <div>
              <Tooltip title="Edit blog">
              <EditIcon className="myblogblog_edit_icon" onClick={blogEditIconClick}/>
              </Tooltip>
                <Tooltip title="Delete blog">
                <DeleteIcon className="myblogblog_delete_icon" onClick={deleteBlogButtonClick} />
                </Tooltip>
               
            </div>
            <div>
            <p className="myblogblog_published_date_text">Publish on {blog.publish_date}</p>
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