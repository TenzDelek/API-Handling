import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [picture, setpicture] = useState([]);
  const [error,seterror]=useState(false)
  const [loading,setloading]=useState(false)
  useEffect(() => {
    //ifi concept from js
    (async () => {
      try {
        setloading(true)
        seterror(false)
        const res = await axios.get("/api/products");
        console.log(res.data);
        setpicture(res.data);
        setloading(false)
      } catch (error) {
        seterror(true)
         setloading(false)
      }
    })();
  }, []);

  if(error)
  {
    return <h1>Something went wrong</h1>
  }
  if(loading)
  {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <h1>Tenzin</h1>
      <h2>Number of Pictures are {picture.length}</h2>
    </>
  );
}

export default App;
