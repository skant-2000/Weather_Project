import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import sun from "../images/sun.svg";
import sunrise from "../images/sunrise.svg";
import sunset from "../images/sunset.svg";
import styles from "./Weather.module.css";

export default function Weather() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=23.0225&lon=72.5714&units=metric&exclude=minutely,hourly&appid=9119b4d04fa80553d17e6d9bda6679de`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (data) {
    var currentDate = new Date(data.current.dt * 1000);
    var currentSunriseDate = new Date(data.current.sunrise * 1000);
    var currentSunsetDate = new Date(data.current.sunset * 1000);
  }

  return (
    <>
      {data ? (
        <div className={styles.main}>
          <div className={styles.current}>
            <div>
              <div>Ahemdabad, Gujrat, IN</div>
            </div>
            <div>
              <div>Today</div>
              <div>
                {`${currentDate.toLocaleString("en-us", {
                  weekday: "long",
                })} ${currentDate.getHours()}:${currentDate.getMinutes()}`}
              </div>
            </div>
            <div>
              <img src={sun} alt="sun" />
              <div>{data.current.temp}</div>
              <div>
                <div>
                  <div>°F</div>
                  <div>°C</div>
                </div>
                <div>
                  <div>{data.current.weather[0].main}</div>
                  <div>{`${data.current.humidity}% Humidity`}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.daily}>
            {data.daily.map((data) => {
              let date = new Date(data.dt * 1000);
              return (
                <div key={v4()}>
                  <p>{date.toLocaleString("en-us", { weekday: "short" })}</p>
                  <img src={sun} alt="sun" />
                  <p>{`${data.temp.max}°`}</p>
                  <p>{`${data.temp.min}°`}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.riseSet}>
            <p>Sunrise/Sunset</p>
            <div>
              <div>
                <img src={sunrise} alt="sunset" />
                <p>{`${
                  currentSunriseDate.getHours() < 10
                    ? `0${currentSunriseDate.getHours()}`
                    : `${currentSunriseDate.getHours()}`
                }:${currentSunriseDate.getMinutes()}`}</p>
              </div>
              <div></div>
              <div>
                <img src={sunset} alt="sunset" />
                <p>{`${
                  currentSunsetDate.getHours() < 10
                    ? `0${currentSunsetDate.getHours()}`
                    : `${currentSunsetDate.getHours()}`
                }:${currentSunsetDate.getMinutes()}`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
