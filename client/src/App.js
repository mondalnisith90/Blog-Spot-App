import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import CreateBlog from './components/CreateBlog';
import MyBlogs from './components/MyBlogs';
import MyProfile from './components/MyProfile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import {Route, Switch} from 'react-router-dom';
import './App.css';


const App = () => {
  return(
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-blog" component={CreateBlog} />
        <Route exact path="/my-blog" component={MyBlogs} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </>
  );
}

export default App;
