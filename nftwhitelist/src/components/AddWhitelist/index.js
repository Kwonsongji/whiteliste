import { useEffect, UseState, React } from "react";
//pour générer un id
import { v4 as uuidv4 } from 'uuid';
 
//Indique la BDD envers la whiteList 
import { ref } from '../App';



const AddWhitelist = (props) => {
  //on veut ajouter des éléments dans la BDD
  function createDoc(newDataObj) {
    // on met dans la var newDataObj qui contiendra l'id, l'add, la balance du user
    // d'abord on veut savoir le nbre de pers' dans la whitelist
    props.getCount();
    //check si l'add ethe valid ( regex : si l'add' commence bien par 0x, il ya bien 40 charact/chiffre'
    //^chapeau
    //$finition) /^0x[a-fA-F0-9]{40}$/
    if (newDataObj.address.match(/^0x[a-fA-F0-9]{40}$/)) {
      //check la limite du groupe 
      if (props.countPeople < 5) {
        // check si l'address existe dans la DB 
        let i = 0; //faire une variable de comptage i 
        // on compte dans la DB tout les élements dont l'addresse 
        //est égal à l'address transmise içi lorsqu'on click sur le bouton
        ref.where("address", "==", newDataObj.address) //on les récupère 
        .get() 
      /*  Un QuerySnapshot contient plus' objets DocumentSnapshot représentant les rés' de la query.
          Les doc's sont accessibles sous forme de tableau via la propriété docs 
          ou énumérés à l'aide d'un forEach.  */
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              i++;
            })
            if (i < 1) {
              if (props.balance >= 0.01) {
                ref.doc(newDataObj.id).set(newDataObj)
                  .then(result => {
                    props.setSuccess('You have been added to the whitelist !');
                    props.setError('');
                  })
                  .catch((err) => {
                    props.setSuccess('');
                    props.setError('Error, we are sorry.');
                  })
              }
              else {
                  props.setSuccess('');
                  props.setError('Not enough on your wallet (0.01 min)');
              }
            }
            else {
                  props.setSuccess('');
                  props.setError('This address is already been added');
            }
        })
        .catch(function (error) {
          props.setSuccess('');
          props.setError('Don\'t get the address ');
          });   
      }
      else {
        props.setSuccess('');
        props.setError('Whitelist max limit exceeded. ');
      }
    }
    else {
      props.setSuccess('');
      props.setError('Invalid Addresscc ');
    }
    //màj le state
    props.getCount();
  }
  return (
    <div> 
      {props.balance >=.1  &&
       <button className="btn" onClick={() => {
        createDoc({
          address: props.accounts[0],
          id: uuidv4(),
          balance: props.balance 
        })
      }}>
        Go on Whitelist   
        </button>
    
      }
    </div>
  )
}

export default AddWhitelist;