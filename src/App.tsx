import { greet } from "./utils/greet";
import episodes from "./episodes.json";
import { useState, useEffect } from "react";


// console.log(`Imported ${episodes.length} episode(s)`);
// console.log(`First episode's name is ${episodes[0].name}`);

interface IEpisode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  _links: { self: { href: string } };
}

function App(): JSX.Element {
  const [episode, setEpisode] = useState<IEpisode>(episodes[0]);
  //const [episodeArray, setEpisodeArray] = useState<IEpisode[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("")


  const handleGetEpisode = async () => {
    const response = await fetch("src/episodes.json"); //loading/fetching takes time, so when you load it there will be no data. this is why you might type it as null
    const jsonBody: IEpisode = await response.json(); //you await the response you defined on 18, then it is assigned to the jsonbody with type dog
    setEpisode(jsonBody);
  };

  // const handleStoreEpisodes = () => {
  //   //add something to deal with possibility of null,maybe if function
  //   //return will kill the function in the case that type = null, so here is where you'd write
  //     setEpisodeArray([...episodeArray, episode])
    
  // };

function editedSummary(summaryInfo: string): string {
  // for (const currentEpisode of episodes) {
  //   const newSummary = currentEpisode.summary;
    //console.log(newSummary.slice(3, -4))
    return summaryInfo.slice(3, -4)
  }

  function paddedNums(nums: number): string {
   const stringToNum = nums.toString();
   const string = stringToNum.padStart(2,'0');
   return string
  }

//this is only looking at the first episode of the summary. function should accept a parameter
//then function should do an action to it, don't need loops
// revise scope, look at the scope level you're at and see if it can be used as an argument, also is it necessary to use it as an argument
 // worth checking you know where all your values are going/being passed into



  return (
  <>
  {/* <h1>{greet("World")}</h1>; */}
  <form>
    <input type="text" placeholder="Search episodes" onChange={event => {setSearchTerm(event.target.value); console.log(event)}}/>
  </form>
  <select>
    <option>Here is an option</option>
  </select>
    <section> 
      {/* //when you're filtering the array you're not changing the values/elements in array, just returning back a new array after its been filtered */}
     {episodes.filter((val) => { //need to give it a boolean, we give the filter a boolean from the callback function 
       if (searchTerm === "") {
       return val
     } else if ((val.name.toLowerCase().includes(searchTerm.toLowerCase())) || (val.summary.toLowerCase().includes(searchTerm.toLowerCase()))) {
       return val //look up truthy statements, they are anything that's not null/undefined/void
     }
    }).map((x) => 
     <div className="episodess" key={x.id}>  
       {x.name} - S{paddedNums(x.season)}EP{paddedNums(x.number)}
       <div>
        <img src={x.image.medium}/>
        </div>
        <div>{editedSummary(x.summary)} </div>
        {/* so here we're passing x.summary in as an argument for editedSummary. This way it only edits info the map returns,  */}
        </div> )}
      

    </section> 
  </>

  );
}

export default App;
