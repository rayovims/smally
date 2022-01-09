import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Post () {
  const router = useRouter();
  const { ref } = router.query;
  const [ flag, setFlag ] = useState(false);


  useEffect(async () => {
    if(ref !== undefined) {
        const response = await axios.post("/api/redirect", { ref });
        if(typeof window !== "undefined") {
            if(response.status === 200) {
                window.location.href = response.data.response.value
            } else {
                setFlag(true);
            }
        }
    }
  }, [ref])

  return (
      <div>
          {flag ? <p>Redirecting...</p> : <p>No Url found</p>}
      </div>
  )
}