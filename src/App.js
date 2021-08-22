// import FirstComponent from "./components/component";
import AddGist from "./components/AddGist.jsx";
import GistListing from "./components/GistListing.jsx";
import TokenSetter from "./components/TokenSetter.jsx";

const token = require("./js/config.js");


// import gistsWrapper from "./js/gistsWrapper";

function App() {
   
  // let ghWrapper = new gistsWrapper(token)


  return (
    <div className="body">
      <div className="container">
        <div>Welcome into Githubwrapper</div>
        <TokenSetter/>
        <AddGist token={token}/>
        <GistListing/>
      </div>
    </div>
  );
}

export default App;
