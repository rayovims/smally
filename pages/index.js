import React, { useState } from 'react';
import Home from '../components/Home';
import axios from 'axios';
import { isValidUrl } from '../global';

export default function Create({ refresh, handleSnackBar }) {
  const [ newUrl, setNewUrl ] = useState("");

  const handleClick = async (url) => {
    if(isValidUrl(url)) {
      const response = await axios.post("/api/url", { url });
      if(response.status !== 200) {
        handleSnackBar({ open: true, severity: "error", message: response })
      } else {
        refresh();
        setNewUrl(response.data.response.value);
      }
    } else {
      handleSnackBar({ open: true, severity: "error", message: "URL IS INVALID" })

    }
  }
  return (
    <div>
      <Home  title={"Enter the URL you wish to shorten"} result={"Your new Shortened URL Is"} newUrl={newUrl} handleClick={(url) => handleClick(url)}/>
    </div>
  )
}
