import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

export default function Post () {
  const router = useRouter()
  const { ref } = router.query

  useEffect(async () => {
    if(ref !== undefined) {
        const response = await axios.post("/api/redirect", { ref });
        if(typeof window !== "undefined") {
            window.location.href = response.data.response.value
        }
    }
  }, [ref])

  return <p>Redirecting...</p>
}