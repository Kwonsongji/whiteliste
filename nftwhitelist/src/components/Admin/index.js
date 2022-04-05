import { useState, UseEffect, React, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // ajout des users dans la => générer de nouv' id
import Firebase from '../Firebase'; // mettre des choses dans la DB
import { ref } from '../App'; // pour avoir accès à la collection

import './style.css';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState('false');
  const [succes, setSuccess] = useState('');
  const [false, setFalse] = useState('');

  // quand on récupère les datas le loading est à true
  useEffect(() => {
    setLoaded(true);
  }, [data]);

  const loggin = () => {
    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLogged(true);
        getData();
        console.log('login success');
      })
      .catch((error) => {
        console.log('login failed');
      })
  }
  const getData = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
       // on créer un tab' de donnée et à chaque fois qu'on rencontre une donné dans la DB,
       // on rajoute cette donnée
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setData(items); //on met le state à jour
    })
  }
  const deleteAddress = (e) => {
    ref.doc(e.target.value).delete(); 
  }
  const addOnWhiteList = () => {
    let balance = 0; //address de la whitelite sera égal au state 
    let id = uuidv4();
    // on créer un obj pour l'ajouter à la whiteliste
    let obj = {
      address: address,
      id: id,
      balance:balance
    }
    // et on rajoute l'obj dans la DB
    ref.doc(obj.id).set(obj)
      .then(result => {
       console.log('User added on whitelist');
      })
      .catch((err) => {
        console.log(err);
      })
  }
 
  
  return (
    <div>
      {!logged
      ?
      <div className="signIn__main">
        <div className="signIn__body">
          <section className="signIn__section" >   
            <div className="signIn__container">
                <form
                  className="signIn__form"
                >        
                  <h1 className="signIn__title">Login Admin </h1>                
                    <div className="signIn__inputBox">
                    <label htmlFor="email"> Email : </label> 
                    {/*  {loading && <LdgBox> </LdgBox> } */}
  {/*               {error && <MsgBox variant="danger">{error}</MsgBox>} */}
                      <input
                        type="email"
                        id="email"
                        className="signIn__mail"
                        placeholder="enter an email"
                        onChange={e => setEmail(e.target.value)}
                        />
                        </div>        
                        <div className="signIn__inputBox">
                      <label htmlFor="email"> Password :</label> 
                        <input
                          type="password"
                          id="password"
                          className="signIn__password"
                          placeholder="enter password"
                          required
                          onChange={e => setPassword(e.target.value)}
                        />
                        </div>
                  <div className=" signIn__connexion">
                    <input
                      value="connexion"
                      onClick={loggin}                   
                    /> 
                  </div>        
                </form>
              </div>          
            </section>
          </div>
        </div>
        :
        <div> Listing od accounts on whiteList 
          {loaded &&
            data.map(el => {
              return <li key={el.id}> {el.address} : { el.balance } <button value={el.id} onClick={deleteAddress}> Delete </button></li>
            })
          }
          Add an address on the whitelist : 
          <input type="text" onChange={e => setAddress(e.target.value)} />
          <button onClick={addOnWhiteList}> Add on the Whitelist </button>
        </div>
        }
      </div>
  )
}

export default Admin;