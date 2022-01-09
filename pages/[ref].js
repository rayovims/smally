import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { Typography } from '@mui/material';

export default function Post (props) {
  const router = useRouter(props);
  const { ref } = router.query;
  const [ flag, setFlag ] = useState(true);

  useEffect(async () => {
    props.changeNav(false)
    if(ref !== undefined) {
        const response = await axios.post("/api/redirect", { ref });
        if(typeof window !== "undefined") {
            if(response.data.response.status === 200) {
                window.location.href = response.data.response.value
            } else {
                setFlag(false);
            }
        }
    }
  }, [ref])

  return (
    <div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={flag}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Typography variant={"h4"} textAlign={"center"} style={{marginTop: "40%"}}>{flag ? <p>Loading...</p> : <p>No Url found</p>}</Typography>
        
    </div>
  )
}