import React, { useState, useEffect } from "react";

export default function GistListing(props) {
  const [gists, setGists] = useState([]);
  // const [gistDeleted, setGistDeleted] = useState(false)

  const deleteGist = (id) => {
    props.wrapper.deleteGist(id).then((response) => {
      if (response.status === 204) {
        console.log("gist został usunięty", id);
        // setGistDeleted(true)
      } else console.log(response.setatus);
    });
  };


  const getListOfGists = () => {
    if (props.tokenIsCorrect) {
      props.wrapper
        .getAllGists()
        .then((response) => {
          setGists(response.data);
        })
        .catch(() => []);
    }
    console.log(gists.map((gist) => console.log(gist)));
  };

  const getFiles = (id) => {
    // ogólnie nie chce mi się tego teraz robić, ale
    // mam taki pomysł by z listy gistów zajumać ich id
    // i zroić request po pojedyńczy gist
    // aby z tego zabrać wszystkie potrzebne dane jak content,
    // filename i przede wszystkim pliki i potem je ustawić
    // useState gist i setGist i potem lajlepiej po kliknięciu na dany gist
    // pokazać te dane na jakiejś osoblen stronie (request z do pojedyńczego gista po kliknięciu)
    //ale idk może jakoś łatwiej da się zrobić xd
  }

  useEffect(() => {
    getListOfGists();
  }, [props.tokenIsCorrect]);

  // useEffect(()=>{
  //   getListOfGists();
  //   setGistDeleted(false)
  // }, [gistDeleted])

  if (gists) {
    return (
      <div>
        <button type={"button"} onClick={getListOfGists}>
          Refresh List!
        </button>
        {gists.map((gist) => {
          return (
            <div key={gist.id}>
              <div>
                {gist.description} 
                {gist.files.content}
                <button type={"button"} onClick={() => deleteGist(gist.id)}>
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
