import styles from './App.module.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData } from './api/index';
import { useEffect, useState } from 'react';
import coronaImage from './images/image.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  // useEffect(async () => {
  //   const fetchedData = await fetchData();
  //   setData(fetchedData);
  // }, []);

  useEffect(() => {
    (async function () {
      setData(await fetchData()); // self calling function
    })();
  }, []);

  const handleCountryChange = async (country) => {
    setCountry(country);
    const fetchedData = await fetchData(country);
    setData(fetchedData);
  };
  return (
    <>
      <div>
        <AppBar position='static' color='inherit'>
          <Toolbar>
            {/* <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton> */}
            <WarningIcon className={styles.icons} />
            <Typography variant='h6'>Covid-19 Tracker</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt='Covid-19' />
        <Cards data={data} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart country={country} data={data} />
      </div>
    </>
  );
}

export default App;
