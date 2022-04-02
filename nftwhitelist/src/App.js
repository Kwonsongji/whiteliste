import { useState, useEffect} from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {

  const [loader, setLoader] = useState(true);
  //on stocke tous les accounts du user dans un array 
  const [accounts , setAccount] = useState([]);
  //nbr d'ether du user
  const [balance, setBalance] = useState();
  //si l'user arrive à la whitelist
  const [success, setSuccess] = useState('');
  //dans le cas où l'user est already inscrit ou pas assez d'ether
  const [error, setError] = useState('');
  // fonction de connex' pour se connecter à l'ether

  //lors du chargement de la page on veut que l'user se co' à se compte => useEffect
  useEffect(() => {
    getAccounts();
    setLoader(false);
  }, []);
  console.log('ok');

   
  // si on change de compte, il faudrait qu'il y mettre à jour les nouvelles données => Event
  window.ethereum.addListener('connect', async (reponse) => {
    getAccounts();
    console.log('ok event');
  });
  window.ethereum.on('accountsChanged', () => {
    window.location.reload();
  });
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
  window.ethereum.on('disconnect', () => {
    window.location.reload();
  });
  async function getAccounts() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // je récupère les accounts mtn je les passe aux state setAccount :
      setAccount(accounts);
     
      console.log('accounts jjj oo', accounts);
    }
    //indiquer à l'user quelle compte il utilise 
    // account.lenght > 0 ça veut dire qu'un compte est connecté
  };

  return (
    <div className="App">
      {!loader &&
        accounts.length > 0 ?
        <p> You are connected on this account: {accounts[0]} </p>
        :
        <p> You are not connected with Metamask to this website. </p>
      }
    </div>
  );
}

export default App;
