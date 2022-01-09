import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function App({ Component, pageProps, test }) {
  const [ nav, setNav ] = useState(true);
  const [ clicks, setClicks ] = useState(null)

  const submitButtonClicked = async () => {
    const response = await axios.get("/api/stats");
    setClicks(response.data.clicks)
  }

  useEffect(() => {
    submitButtonClicked();
  }, [])

  return (
    <div>
      <Header nav={nav} clicks={clicks}/>
      <Component {...pageProps} changeNav={(nav) => setNav(nav)}/>
    </div>
  ) 
}