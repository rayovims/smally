import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from "@mui/material/Typography"

export default function Post ({ changeNav, spinner }) {
  const router = useRouter();
  const { ref } = router.query;
  const [ flag, setFlag ] = useState(true);

  useEffect(async () => {
    changeNav(false);
    spinner(true);
    if(ref !== undefined) {
        const response = await axios.post("/api/redirect", { ref });
        if(typeof window !== "undefined") {
            if(response.data.response.status === 200) {
                window.location.href = response.data.response.value
            } else {
                setFlag(false);
                spinner(false)
            }
        }
    }
  }, [ref])

  return (
    <div>
        <Typography variant={"h4"} textAlign={"center"} style={{marginTop: "20%"}}>{flag ? <p>Loading...</p> : <p>No Url found</p>}</Typography>
        
    </div>
  )
}