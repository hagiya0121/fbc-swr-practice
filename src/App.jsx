import { useState } from "react";
import useSWR from "swr";
import "./App.css";

function App() {
  const [status, setStatus] = useState("");

  const fetcher = (url, headers) =>
    fetch(url, { headers }).then((res) => res.json());

  const url = "https://httpstat.us/200?sleep=2000";
  const headers = { Accept: "application/json" };
  const { error, isLoading } = useSWR(
    [url, headers],
    ([url, headers]) => fetcher(url, headers),
    {
      onSuccess: (data) => {
        setStatus(data.description);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load.</div>;

  return <>{status && <p>Status : {status}</p>}</>;
}

export default App;
