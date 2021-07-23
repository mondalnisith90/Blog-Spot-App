import blogImg from "../images/laptop3.jpg";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import "../css/MyBlogBlog.css";


const MyBlogBlog = ({setState}) => {

  const editClick = () => {
    setState(false);
  }
    return(
        <>
        <div className="my-5">
          <img src={blogImg} alt="" className="myblogblog_blog_image" />
          <div className="myblogblog_blog_body">
            <div className="myblogblog_body_header_div d-flex justify-content-between">
            <div>
            <p className="myblogblog_auther_name_text">Category: Cooking</p>
            </div>
            <div>
              <Tooltip title="Edit blog">
              <EditIcon className="myblogblog_edit_icon" onClick={editClick}/>
              </Tooltip>
                <Tooltip title="Delete blog">
                <DeleteIcon className="myblogblog_delete_icon" />
                </Tooltip>
               
            </div>
            <div>
            <p className="myblogblog_published_date_text">4 days  ago</p>
            </div>
            </div>
            <h2 className="myblogblog_blog_title">Checken Chue delicius recipy</h2>
            <p className="myblogblog_blog_description">
            Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
            our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
            our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
            Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
            our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
            our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
            </p>
          </div>
          </div>
        </>
    );
}

export default MyBlogBlog;