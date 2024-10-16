import useSWR from "swr";
import "./App.css";

function App() {
  const fetcher = (url, headers) =>
    fetch(url, { headers }).then((res) => res.json());

  const url = "https://httpstat.us/200?sleep=2000";
  const headers = { Accept: "application/json" };
  const { data, error, isLoading } = useSWR([url, headers], ([url, headers]) =>
    fetcher(url, headers)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load.</div>;

  return <>{data && <p>Status : {data.description}</p>}</>;
}

export default App;
