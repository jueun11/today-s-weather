import axios from "axios";
import { useEffect, useState } from "react";
import MyKey from "./MyKey";

const WeatherView = () => {
  //임시로 지역은 서울로 해두었다. 지역을 찾아오는 방법도 있던데 기능을 추가해야한다.
  const [city, setCity] = useState("Seoul");

  const [weatherData, setWeatherData] = useState({
    Temp: "",
    weather: "",
    icon: "",
  });
  useEffect(() => {
    const Data = async () => {
      try {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyKey}`
          )
          .then((res) => {
            setWeatherData({
              ...weatherData,
              Temp: (res.data.main.temp - 273.15).toFixed(1),
              weather: res.data.weather[0].main,
              icon: res.data.weather[0].icon,
              //맑은날은 clear swich문으로 case따라 출력해주면?
            });
            console.log(res.data);
          });
      } catch (error) {
        console.log("실패");
      }
    };
    //꼭 실행해줘야한다. 왜냐면 위의 부분은 함수 정의일 뿐이기에, 실행은 따로다. 즉시실행함수로 바꿔도 괜찮을까?
    Data();
    //도시가 바뀌면 재렌더링된다.
  }, [city]);

  console.log(weatherData);
  return (
    <div>
      <h1>Todays Weather</h1>
      <div>
        <img
          src={"http://openweathermap.org/img/w/" + weatherData.icon + ".png"}
        />
      </div>
      <h3>{`현재 ${city}의 온도는 ${weatherData.Temp}°С 입니다.`}</h3>
    </div>
  );
};

export default WeatherView;
