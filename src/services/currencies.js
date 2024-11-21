import bnbImage from '../assets/images/currencies/bnb.png';
import btcImage from '../assets/images/currencies/btc.png';
import dogeImage from '../assets/images/currencies/doge.png';
import ethImage from '../assets/images/currencies/eth.png';
import usdImage from '../assets/images/currencies/usd.png';
import usdtImage from '../assets/images/currencies/usdt.png';
import rippleImage from '../assets/images/currencies/ripple.png';
import solImage from '../assets/images/currencies/sol.png';
import polkaImage from '../assets/images/currencies/polka.png';
import adaImage from '../assets/images/currencies/ada.png';


export const currencies = [
    { code: "USD", name: "United States Dollar", rate: 0.25, image: usdImage },
    { code: "BTC", name: "Bitcoin", rate: 0.00002, image: btcImage },
    { code: "ETH", name: "Ethereum", rate: 0.0003, image: ethImage },
    { code: "USDT", name: "Tether", rate: 1, image: usdtImage },
    { code: "BNB", name: "Binance Coin", rate: 0.01, image: bnbImage },
    { code: "ADA", name: "Cardano", rate: 1.2, image: adaImage },
    { code: "XRP", name: "Ripple", rate: 0.5, image: rippleImage },
    { code: "SOL", name: "Solana", rate: 0.015, image: solImage },
    { code: "DOGE", name: "Dogecoin", rate: 3, image: dogeImage },
    { code: "DOT", name: "Polkadot", rate: 0.02, image: polkaImage },
  ];
  