import axios from "axios";

function App() {
  const cities = ['Philadelphia', 'Boston', 'Mumbai', 'Shanghai', 'Dakar'];

  // async/await
  async function getWeather(city){
    try{
      const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d01dbe80c384ea20a6937f2aa98848d`);
      return data

    }catch(err) {
      console.log(err);
    }


  }
  
  function handleClick(e){
    e.preventDefault();
    getWeather(e.target.value).then((resp) => console.log(resp)).catch(err => console.error(err));

  }

  return (
    <div>
     <header>
       <input type="text" />
       <button type="button">OK</button>
       </header>
       <section>
        <h1>Cities</h1>
        <nav>
          <ul>
            {cities.map((city)=>
            <li key={city}><button onClick={handleClick} value={city}>{city}</button></li>)}
          </ul>
        </nav>

       </section>



    </div>
  );
}

export default App;
