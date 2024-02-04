import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
//  const[picture,error,loading]=customReactQuery('/api/products') // u can uncomment this and below last function
//if u want
const [picture, setpicture] = useState([]);
  const [error,seterror]=useState(false)
  const [loading,setloading]=useState(false)
  const [search,setsearch]=useState('')
  useEffect(() => {
    const controller =new AbortController()
    //iife concept from js
    //the simicolon is needed at start if there is an code before it
    ;(async () => {
      try {
        setloading(true)
        seterror(false)
        const res = await axios.get(`/api/products?search=${search}`,{
          signal: controller.signal
        });
        console.log(res.data);
        setpicture(res.data);
        setloading(false)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log(`REQUEST CANCELED ${error.message}`)
          return
        }
        seterror(true)
         setloading(false)
      }
    })();

    //cleanup method for controller for unmount
    return ()=>{
      controller.abort()
    }

  }, [search]);
  if(error)
  {
    return <h1>Something went wrong</h1>
  }
  if(loading)
  {
    return <h1>Loading...</h1>
  }
  //we can write the above in a single line using &&
  return (
    <>
    {/* {loading && <h1>Loading...</h1>}
    {error && <h1>Something went wrong</h1>} */}

      <h1>Tenzin</h1>
      <input type="text" placeholder="Search" 
       value={search} onChange={(e)=>setsearch(e.target.value)}/>
       {/* now  when we search each char is set check line18 but we only need the final word not
       the each char that we type(RACE CONDITION). so to solve this in axios we have the concept of controller and signal see above
       it basically cancel the previous request but we need to handle it in catch
       
       DONT GET CONFUSE, THE ABOVE SOLN DOESNT STOP THE REQ, IT MAKES THE REQ THAT WHOEVER WENT FIRST
       WILL RESPOND FIRST. 
       
       IF YOU JUST WANT ONLY THE FINAL REQUEST THAT THE CONCEPT OF DEBOUNCING*/}
      <h2>Number of Pictures are {picture.length}</h2>
    </>
  );
}

export default App;

// const customReactQuery=(urlpath)=>{
//   const [picture, setpicture] = useState([]);
//   const [error,seterror]=useState(false)
//   const [loading,setloading]=useState(false)
//   const [search,setsearch]=useState('')
//   useEffect(() => {
//     //iife concept from js
//     (async () => {
//       try {
//         setloading(true)
//         seterror(false)
//         const res = await axios.get(urlpath);
//         console.log(res.data);
//         setpicture(res.data);
//         setloading(false)
//       } catch (error) {
//         seterror(true)
//          setloading(false)
//       }
//     })();
//   }, []);
//   return [picture,error,loading]
// }