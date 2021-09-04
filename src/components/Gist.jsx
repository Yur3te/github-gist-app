import React, { useState, useEffect } from "react";

export default function Gist(props) {
  const [gist, setGist] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // if (props.tokenIsCorrect) {
      props.wrapper.getGist(props.id).then((response) => {
        // setGist(response.data);
        console.log(response.data);

        const files = [];
        Object.keys(response.data.files).forEach((key) => {
          files.push({
            name: response.data.files[key].filename,
            content: response.data.files[key].content,
          });

          console.log(files)
          setGist({
            id: props.id,
            createdAt: response.data.created_at,
            description: response.data.description,
            isPublic: response.data.public,
            files: files,
          });
        });
      });
    // }
  }, [
    //   props.id, props.tokenIsCorrect, props.wrapper
]);

  if (gist)
    return (
      <div>
        Description: {gist.description}
        {gist.files.map((file, index) => (
          <div key={index}>
            <div>Filename: {file.name}</div>
            <div>content: {file.content}</div>
          </div>
        ))}
      </div>
    );
  else <></>;
}
