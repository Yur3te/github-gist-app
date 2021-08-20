// import FirstComponent from "./components/component";
import AddGist from "./components/AddGist.jsx";
import GistListing from "./components/GistListing.jsx";



import gistsWrapper from "./js/gistsWrapper";

function App() {
   
  // let ghWrapper = new gistsWrapper(token)


  return (
    <div className="body">
      <div className="container">
        <div>Welcome into Githubwrapper</div>
        <AddGist/>
        <GistListing/>
      </div>
    </div>
  );
}

export default App;
