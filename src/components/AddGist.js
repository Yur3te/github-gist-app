import React, { useState } from 'react';
import { useRef } from 'react'

import gistsWrapper from "../js/gistsWrapper";
const token = require("../js/config.js")



function AddGist(props) {

    const getWrapper = function() {
        const wrapper = new gistsWrapper(token)
        return wrapper
    }

    const fileNameRef = useRef();


    // const [files, setFiles] = useState()

    // const filenameHandler = (value, i) =>
    //   setFiles(files => files.map((item, index) => index === i ? {...item, name: value} : item))






     const create = (event) => {
        const enteredFileName = fileNameRef.current.value;
        event.preventDefault();



        

        let gistPayload = {
          "description": "opis",
          "public": true,
          "files": {
            enteredFileName: {
            "content": "nazwa",
            }
          }
        }

        // let gistPayload = {
        //   "description": "opis",
        //   "public": true,
        //   "files": {
        //     "czy dziala.txt": {
        //       "content": "ni chuja :D"
        //     }
        //   }
        // }

        const wrapper = getWrapper()
        wrapper.createGist(gistPayload).then((response) => console.log(response.data)).catch((err) => {console.log(err)})
    }


    return(
    <div>
        <div>
            <form onSubmit={create}>
                <div>
                    <label>Nazwa pliku:</label>
                    <input type="text" ref={fileNameRef}/>
                </div>
                <div>
                    <label>Treść:</label>
                    <input type="text"/>
                </div>
                <input type="submit" value="Wyślij" />
        </form>
      </div>
    </div>
    )
}

export default AddGist