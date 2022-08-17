import logo from './logo.svg'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

//https://xaus.ap.ngrok.io/xausval
//

function App() {
  const [marketcap, setMarketCap] = useState(0)
  const [gcsUsdt, setGcsUsdt] = useState(0)
  const [gcsUsdm, setGcsUsdm] = useState(0)
  const [xausUsdm, setXausUsdm] = useState(0)
  const [xauusd, setXauUsd] = useState(0)
  const [xaususdt, setXausUsdt] = useState(0)
  const [adcxaus, setAdcXaus] = useState(0)
  const [gcsadc, setGcsAdc] = useState(0)
  const [adcustd, setAdcUsdt] = useState(0)

  useEffect(() => {
    const init = () => {
      axios.get('https://xaus.ap.ngrok.io/xausval')
        .then((res) => {
          res.data.reverse();
          setXausUsdm(res.data[0].XAUSTOUSDM);
          setXausUsdt(res.data[0].XAUSTOUSD);
          setXauUsd(res.data[0].XAUTOUSD)
        }).catch(console.error)

        axios.get("https://apigctech.ap.ngrok.io/values").then((res)=>{
          setMarketCap(res.data[0].GCSMARKETCAP);
        }).catch(console.error)

        axios.get("https://apigctech.ap.ngrok.io/usdm").then((res)=>{
          setGcsUsdm(Number(res.data[0].GCS2USDM).toFixed(5))
          setGcsUsdt(Number(res.data[0].GCS2USDT))
        }).catch(console.error)

        axios.get("https://asiadc.ap.ngrok.io/all").then((res)=>{
        res.data.reverse();
        console.log(res)
        setGcsAdc(Number(res.data[0].GCStoADC).toFixed(5));
        setAdcXaus(Number(res.data[0].XAUstoADC).toFixed(5))
        }).catch(console.error)

        axios.get("https://asiadc.ap.ngrok.io/adctousd").then((res)=>{
          setAdcUsdt(Number(res.data[0].ADC2USD).toFixed(5))
        }).catch(console.error);
    }
    setInterval(()=>{
      init();
    },6000)
    init();
  },[])

  return (
    <div className="App">
      <nav class="navbar navbar-light gcsnav mb-3">
        <a class="navbar-brand" href="#" style={{marginLeft:"20px"}}>
          <img
            src="https://cdn2.bttcdn.com/2e4add5483abf2ff/e2bc39a2d59c627c24ff83406d75d1a6.png"
            width={80}
            height="45"
            alt=""
          />
        </a>
      </nav>
      <div className="pairs">
        <div className="single-pairs d-flex  justify-content-around">
          <h3 className="text-white lable">GCS MarketCap: </h3>
          <h3 className="values">{marketcap}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">GCS to USDT: </h3>
          <h3 className="values">{gcsUsdt}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">GCS to USDM: </h3>
          <h3 className="values">{gcsUsdm}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">XAUs to USDM: </h3>
          <h3 className="values">{xausUsdm}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">XAU to USD: </h3>
          <h3 className="values">{xauusd}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">XAUs to USDT: </h3>
          <h3 className="values">{xaususdt}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">XAUs to ADC: </h3>
          <h3 className="values">{adcxaus}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">GCS to ADC:</h3>
          <h3 className="values">{gcsadc}</h3>
        </div>
        <div className="single-pairs d-flex justify-content-around">
          <h3 className="text-white lable">ADC to USDT: </h3>
          <h3 className="values">{adcustd}</h3>
        </div>
      </div>
      <div className="container-fluid footer-main text-white">
        <p>
          &copy; 2022 GCEX, All rights reserved | By{' '}
          <a
            href="https://kesaviwebsolutions.com"
            target="_blank"
            rel="noreferrer"
          >
            KWS
          </a>
        </p>
      </div>
    </div>
  )
}

export default App
