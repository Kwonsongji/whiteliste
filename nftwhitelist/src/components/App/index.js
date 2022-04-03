import { useState, useEffect} from 'react';
import { ethers } from 'ethers';

import InfosAccount from '../InfosAccounts';
import AddWhitelist from '../AddWhitelist';
import Firebase from '../Firebase';

import './index.css';
//faire une réf à cette BDD:
const ref = Firebase.firestore().collection('whitelist');
 
function App() {

  const [countPeople, setCountPeople] = useState(0  );
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
    getCount();
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
  //Get the number in the whitelist : 
  function getCount() {
    // ref désigne la collection
    // get() récupère
    // then faire un traitement
    ref.get().then(function (querySnapshot) {
      setCountPeople(querySnapshot.size);
    })
  }
  async function getAccounts() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // je récupère les accounts mtn je les passe aux state setAccount :
      setAccount(accounts);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // if get BigNumber on obtient en wei la balance 
      const balance = await provider.getBalance(accounts[0]); 
      // wei => ether
      const balanceInEth = ethers.utils.formatEther(balance);
      console.log(balance);
      console.log(balanceInEth);
      setBalance(balanceInEth);
     
      console.log('accounts', accounts); 
    }
    //indiquer à l'user quelle compte il utilise 
    // account.lenght > 0 ça veut dire qu'un compte est connecté
  };

  return (
    <div className="App">
      {error && <p className="alert error">{error} </p>}
      {success && <p className="alert success">{success} </p>} 
      {/* on transmets les states par les props */}
      <InfosAccount
        accounts={accounts}
        balance={balance}
        loader={loader} />
      <AddWhitelist
         accounts={accounts}
        countPeople={countPeople}
        setCountPeople={setCountPeople}
        getCount={getCount}
        balance={balance}
        setBalance={setBalance}
        setError={setError}
        setSuccess={setSuccess}
      />
    </div>
  );
}
export { ref };
export default App;
