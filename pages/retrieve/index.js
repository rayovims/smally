import React, { useState } from 'react';
import Home from '../../components/Home';
import axios from 'axios';
import { isValidUrl } from '../../global';

export default function Retrieve({ handleSnackBar, spinner }) {
  const [ newUrl, setNewUrl ] = useState("");

  const handleClick = async (url) => {
    if(isValidUrl(url)) {
        spinner(true);
        let ref;
        if(url.includes("localhost") || url.includes("smally.vercel.app")) {
            let _url = url.substring(8);
            let index = _url.indexOf("/");
            ref = _url.substring(index + 1)
        } else {
            ref = -1;
        }
        const response = await axios.post("/api/retrieve", { ref });
        spinner(false);
        if(response.status !== 200) {
          handleSnackBar({ open: true, severity: "error", message: response });
        } else {
            if(response.data.response.status === 200) {
              setNewUrl(response.data.response.value);
            } else {
              setNewUrl("NO Url Found");
            }
        }
    } else {
      handleSnackBar({ open: true, severity: "error", message: "URL IS INVALID" });
    }
  }

  return (
    <div>
      <Home  title={"Enter the shortened URL to retrieve the orginal URL"} result={"The Original URL Is"} newUrl={newUrl} handleClick={(url) => handleClick(url)} handleSnackBar={(snack) => handleSnackBar(snack)}/>
    </div>
  )
}
