let getLoc = async () => {
  const url =
    "http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone";
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

let getWeather = async (lat, lon) => {
  api = "f0894defae7c5584798f8812232a40c2";

  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

  const response = await fetch(url);
  const data = response.json();

  return data;
};
function getDayOrNight() {
  let DayOrNigh;
  var d = new Date();

  const hour = d.getHours();

  if (hour >= 6 && hour <= 19) {
      DayOrNigh = 'Day';
  } else {
      DayOrNigh = 'Night';
  }

  return DayOrNigh;
}

function getIcon(weMain) {
  let icon;
  switch (weMain) {
    case "thunderstorm":
      icon = `${weMain}.svg`;
      break;

    case "Drizzel":
      icon = `${weMain}.svg`;
      break;

    case "Rain":
      icon = `${weMain}.svg`;
      break;

    case "Snow":
      icon = `${weMain}.svg`;
      break;
    case "Clear":
      const DayOrNight = getDayOrNight();
      icon = `${weMain}-${DayOrNight}.svg`;
      break;
    case "Clouds":
      icon = `${weMain}.svg`;
      break;
    case "Atmosphere":
      icon = `${weMain}.png`;
      break;
  }
  return icon;
}

function getTemp(weTemp) {
  let k = weTemp;
  let f = ((k - 273.15) * 9) / 5 + 23;
  let c = k - 273.15;
  return (temp = {
    kel: Math.floor(k),
    far: Math.floor(f),
    can: Math.floor(c),
  });
}

//document object model
//timezone
let loti = document.querySelector(".timezone");
let icon = document.querySelector(".icon");
let dese = document.querySelector(".degree-section");
let deg = document.querySelector(".degree-section h2");
let unit = document.querySelector(".degree-section span");
let tede = document.querySelector(".temperature-description");

getLoc()
  .then((locData) => {
    let timeZone = locData.timezone;
    loti.textContent = timeZone;
    console.log(timeZone);
    return getWeather(locData.lat, locData.lon);
  })
  .then((weData) => {
    let weTemp = weData.main.temp;
    let weMain = weData.weather[0].main;
    let weDes = weData.weather[0].description;
    console.log(weTemp, weMain, weDes);
    let iconName = getIcon(weMain);
    icon.innerHTML = `<img src ='icons/${iconName}'></img>`;
    deg.textContent = Math.floor(weTemp);
    unit.textContent = "K";

    dese.addEventListener("click", function (e) {
      if (unit.textContent == "K") {
        deg.textContent = getTemp(weTemp).far;
        unit.textContent = "F";
      } else if (unit.textContent == "F") {
        deg.textContent = getTemp(weTemp).can;
        unit.textContent = "C";
      } else {
        deg.textContent = getTemp(weTemp).kel;
        unit.textContent = "K";
      }
    });
    tede.textContent = weDes;
  });
