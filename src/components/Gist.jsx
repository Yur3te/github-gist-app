import React, { useState, useEffect } from "react";

export default function Gist(props) {
  const [gist, setGist] = useState();

  const deleteGist = (id) => {
    props.wrapper.deleteGist(id).then((response) => {
      if (response.status === 204) {
        console.log("Gist has been deleted", id);
      } else console.log(response.setatus);
    });
  };


  useEffect(() => {
    if (props.tokenIsCorrect) {
      props.wrapper.getGist(props.id)
      .then((response) => {
        if (response.status===200) {
              const files = [];
              Object.keys(response.data.files).forEach((key) => {
                files.push({
                  name: response.data.files[key].filename,
                  content: response.data.files[key].content,
                });

                setGist({
                  id: props.id,
                  createdAt: response.data.created_at,
                  description: response.data.description,
                  isPublic: response.data.public,
                  files: files,
                });
              });
            }
      });
    }
  }, [props.id, props.tokenIsCorrect, props.wrapper]);

  if (gist) {
    return (
      <div>
        <div>
          Description: {gist.description}
          <button type="button" onClick={() => props.setEditingId(gist.id)}>Edit Gist</button>
        </div>
        <div>
          Public: {gist.isPublic ? "Yes" : "No"}
        </div>
        <div>
          Date of creation: {gist.createdAt}
        </div>
        
        {gist.files.map((file, index) => (
          <div key={index}>
            File number {index + 1}
            <div>Filename: {file.name}</div>
            <div>content: {file.content}</div> <br/>
          </div>
        ))}
        <button type={"button"} onClick={() => deleteGist(gist.id)}>
            ^^^Delete gist above^^^
        </button>
      </div>
    );
  } else return <div></div>;
}