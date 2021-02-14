import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, lastUpdate, deaths },
    } = await axios.get(changeableUrl);

    const modifiedData = {
      confirmed,
      recovered,
      lastUpdate,
      deaths,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      recovered: dailyData.recovered.total,
      date: dailyData.reportDate,
    }));
    var modifiedData2 = [];
    let temp = '';
    data.map((dailyData2) => {
      if (temp !== dailyData2.reportDate.substring(5, 7)) {
        let tempObj = { confirmed: 0, deaths: 0, recovered: 0, date: Date };
        tempObj.confirmed = dailyData2.confirmed.total;
        tempObj.deaths = dailyData2.deaths.total;
        tempObj.date = dailyData2.reportDate;

        modifiedData2.unshift(tempObj);
      }
      temp = dailyData2.reportDate.substring(5, 7);
    });
    return modifiedData2.reverse();
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
