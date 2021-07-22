// import image from "../images/cat2.jpg";
import {useHistory} from 'react-router-dom';
import "../css/Blog.css";


const Blog = ({image}) => {
    const history = useHistory();
    const onBlogClick = () => {
        history.push("/single-blog");
    }

    return(
        <>
         <section className="blog_root_div shadow mb-5" onClick={onBlogClick}>
           <img src={image} alt="" className="blog_image" />
           <div className="blog_body">
             <div className="body_header_div d-flex justify-content-between">
             <div>
             <p className="auther_name_text">Auther: Gia Karter</p>
             </div>
             <div>
             <p className="published_date_text">4 days  ago</p>
             </div>
             </div>
             <h2 className="blog_title">Checken Chue delicius recipy</h2>
             <p className="blog_description">
             Anthropologist Richard Wrangham has proposed cooking arose before 1.8 million years ago, an invention of
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             our evolutionary ancestors. If the custom emerged this early, it could explain a defining feature of our
             </p>
           </div>
         </section>
        </>
    );
}

export default Blog;