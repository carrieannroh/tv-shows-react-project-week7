import { greet } from "./utils/greet";
import episodes from "./episodes.json";
import { useState, useEffect } from "react";


console.log(`Imported ${episodes.length} episode(s)`);
console.log(`First episode's name is ${episodes[0].name}`);

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

function editedSummary() {
  for (const eachEpisode of episodes) {
    const newSummary = eachEpisode.summary;
    //console.log(newSummary.slice(3, -4))
    return newSummary.slice(3, -4)
  }
}
 



  return (
  <>
  {/* <h1>{greet("World")}</h1>; */}
    <section>
     {episodes.map((x) => //so bcz you've imported episodes which is already an array, you can just map over that file
     <div key={x.id}>
       {x.name} - S{x.season}EP{x.number}
       <div>
        <img src={x.image.medium}/>
        </div>
        <div>{editedSummary()} </div>
        
        </div> )}
      

    </section> 
  </>
  );
}

export default App;
