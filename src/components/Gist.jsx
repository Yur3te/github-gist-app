import React, { useState, useEffect } from "react";

export default function Gist(props) {
  const [gist, setGist] = useState();

  useEffect(() => {
    if (props.tokenIsCorrect) {
      props.wrapper.getGist(props.id).then((response) => {
        const files = [];
        Object.keys(response.data.files).forEach((key) => {
          files.push({
            name: response.data.files[key].filename,
            content: response.data.files[key].content,
          });

          // console.log(files)
          setGist({
            id: props.id,
            createdAt: response.data.created_at,
            description: response.data.description,
            isPublic: response.data.public,
            files: files,
          });
        });
        // console.log(gist.files)
      });
    }
  }, [props.id, props.tokenIsCorrect, props.wrapper]);

  if (gist) {
    return (
      <div>
        Description: {gist.description} <br />
        Public: {gist.isPublic ? "Yes" : "No"} <br />
        Date of creation: {gist.createdAt}
        {gist.files.map((file, index) => (
          <div key={index}>
            File number {index + 1}
            <div>Filename: {file.name}</div>
            <div>content: {file.content}</div>
            <br />
          </div>
        ))}
      </div>
    );
  } else return <div></div>;
}
