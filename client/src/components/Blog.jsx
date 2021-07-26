// import image from "../images/cat2.jpg";
import {useHistory} from 'react-router-dom';
import BlogPage from './BlogPage';
import "../css/Blog.css";


const Blog = ({blogObj, setClickedBlogId, setShowLargeBlog}) => {
    const history = useHistory();
    const onBlogClick = () => {
        // history.push(`/single-blog/${blogObj._id}`);
      // return ( <BlogPage blogId={blogObj._id} />);
      setClickedBlogId(blogObj._id);
      setShowLargeBlog(true);
       
    }

    return(
        <>
         <section className="blog_root_div shadow mb-5" onClick={onBlogClick }>
           <img src={blogObj.blog_image} alt="" className="blog_image" />
           <div className="blog_body">
             <div className="body_header_div d-flex justify-content-between">
             <div>
            <p className="auther_name_text">Auther: {blogObj.auther}</p>
             </div>
             <div>
             <p className="published_date_text">{blogObj.publish_date}</p>
             </div>
             </div>
             <h2 className="blog_title">{blogObj.title}</h2>
             <p className="blog_description">
             {blogObj.body}
             </p>
           </div>
           
         </section>
        </>
    );
}

export default Blog;