
const firebaseConfig = {
  apiKey: "AIzaSyCUMpdVL5KVInLTDcnYNBQOR_7feCnXLoQ",
  authDomain: "juegos-web-d5fac.firebaseapp.com",
  projectId: "juegos-web-d5fac",
  storageBucket: "juegos-web-d5fac.appspot.com",
  messagingSenderId: "1045930967153",
  appId: "1:1045930967153:web:371918d3335c41ded11bd0"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export async function saveUser(user) {
  const {coins_activity_in_out, coins_activity_left_right, coins_activity_up_down, name_avatar, pin } = user;
  let save=false;
  await db.collection("users").doc().set({
    coins_activity_in_out,
    coins_activity_left_right,
    coins_activity_up_down,
    name_avatar,
    pin
  })
    .then(() => {
      save=true;
    })
    .catch(() => {
      showError(error);
    })

    return save;
}
  


export async function getUser(pin) { 
  let users = await db.collection("users");
  let user;
    await users.where("pin", "==",pin).get()
       .then((result)=>{
         result.forEach((doc)=>{
           user={
             id:doc.id,
             name_avatar:doc.data().name_avatar
           }
        
         });
       }).catch(()=>{
          showError();
       })
     return user;
}

export async function updateCoinsLefRightActivity(idUser, coinsExercise) {
  let user = await db.collection("users").doc(idUser);
  //primero debo obtener las monedas que lleva actualmente para sumarlas
  let actualCoins =  await getCoinsLefRightActivity(idUser);
  if(typeof actualCoins === 'number'){
    let coins=actualCoins+coinsExercise;
    const data ={
      coins_activity_left_right:coins
    }
    user.update(data);
  }
}

export async function getCoinsLefRightActivity(idUser) {
  let docUser = await db.collection("users").doc(idUser);
  let coins;
  await docUser.get()
     .then((doc) =>{
          if(doc.exists){
            coins=doc.data().coins_activity_left_right;
          }
      })
    .catch(() => {
      // showError();
    });
    return coins;
}

export async function getCoinsInOutActivity(idUser) {
  let users = await db.collection("users");
  let coins;
  await users.where("pin", "==",pin).get()
     .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          coins=doc.data().coins_activity_in_out;
      });
    }).catch((error) => {
      
    })
    return coins;
}

export async function getCoinsUpDowntActivity(idUser) {
  let users = await db.collection("users");
  let coins;
  await users.where("pin", "==",pin).get()
     .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          coins=doc.data().coins_activity_up_down;
      });
    }).catch(() => {
      // showError(error);
    })
    return coins;
}

export async function validatePin(pin) { 
  let users = await db.collection("users");
  let exists=false;
  await users.where("pin", "==",pin).get()
     .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          exists= true; 
      });
    }).catch(() => {
      //CREAR VENTANA  PARA MOSTRAR SI HUBO UN ERROR
      // showError(error);
    })
    return exists;
}

