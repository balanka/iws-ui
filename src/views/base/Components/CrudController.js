import axios from "axios";
import routes from '../../../routes';
import {MASTERFILE} from "./Menu";
import iwsStore from './Store';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Edit = (url, token, record, data,  setCurrent) => {
   var result;
     axios.put( url, record, {headers: {'Authorization':`Bearer ${token}`}})
      .then(response => {
        const resp = response.data
        const index = data.findIndex(obj => {
          return obj?(obj.id === record.id):false
        });
        data[index]= resp;
        result=resp;
        setCurrent(resp);
        console.log('resultX', result);
      }).catch(function (error) {
         console.log('error', error);
       });
  console.log('resultX', result);
  return result;
  };
 const Add = (url, token, record, data, setCurrent) => {
   let result;
   axios.post(url, record, {headers: {'Authorization': `Bearer ${token}`}})
     .then(response => {
       const resp = response.data
       const index =  data.length + 1;
       data[index] = resp;
       result=resp;
       setCurrent(resp);
     }).catch(function (error) {
     console.log('error', error);
   });
   return result;
  };
 const Post = (url, profile, record) => {
     axios.patch(url, record, {headers: {'Authorization':`Bearer ${profile.token}`}})
      .then(response => {
        console.log('responsex', response.data);
      }).catch(function (error) {
      console.log('error', error);
    });
  };

 const Login = (history, url, data, setProfile, MENU, t, setMenu, setModule, setRoutes) => {
        axios.post( url, data)
            .then(response => {
              const hash = response.data.hash
              console.log("response.data:", response.data);
              console.log("response.data.hash:", hash);
                const authorization = hash//response.headers
                const profile = {token:response.data.hash, company:response.data.company
                    , modules:response.data.menu};
                setProfile(profile);
              const token = response.data.hash
              const moduleURL=SERVER_URL.concat(MASTERFILE.moduleURL);
              console.log("modules>>>>>>>>>>>>", module);
              axios.get(moduleURL, {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                  const module = response.data
                  iwsStore.put(400, module);
                  const menu = module.map(m=>m.path).filter(p=> p!== '/');
                  const menu_t  = MENU(t);
                  const routes_t  = routes(t);
                  const newMenu = new Map([...menu_t].filter(([k, _]) => menu.includes(k)));
                  const newRoutes = routes_t.filter(r => menu.includes(r.path) )
                  console.log("newMenu>>>>>>>>>>>>", newMenu);
                  console.log("newRoutes>>>>>>>>>>>>", newRoutes);
                  setModule(module);
                  setMenu(newMenu);
                  setRoutes(routes(t));
                }).catch(function (error) {
                console.log('Error', error);
                if (JSON.stringify(error).includes("401")) {
                  console.log('error', "Session expired!!!!! Login again!!!!");
                  history.push("/login");
                }
                console.log('error', error);
              });
                history.push("/dashboard");
              console.log("authorization:", authorization);
              console.log("profile:", profile);
              console.log("response:", response);
            }).catch(function (error) {
            console.log('error', error);
           // history.push(routes.user.login)
        });
    }
 const Get = (url, token, history, func) => {
      let result;
          axios.get( url, {headers: {'Authorization':`Bearer ${token}`}})
            .then(response => {
                const resp = response.data
              console.log('responseRRRRRR', resp);
               func?func(resp):void(false);
                result={...resp};
                console.log('resp', resp);

            }).catch(function (error) {
            console.log('Error', error);
              if(JSON.stringify(error).includes("401")) {
                  console.log('error', "Session expired!!!!! Login again!!!!");
                  history.push("/login");
              }

                console.log('error', error);
            })
   console.log('resultRRRRRR', result);
            return result;
        }

const Get1 = (url, token,  store, key_) => {
  let result;
  console.log('url', url);
  axios.get( url, {headers: {'Authorization':`Bearer ${token}`}})
    .then(response => {
      const resp = response.data
      console.log('respRRRRRR', resp);
      store.put(key_, resp);
      result={...resp};
    }).catch(function (error) {
    console.log('error', error);
  })
  console.log('resultRRRRRR', result);
  return result;
}

const Get2 =  (url, token, store, setCurrent) => {
  let result;
  console.log('url', url);
    axios.get( url, {headers: {'Authorization':`Bearer ${token}`}})
    .then(response => {
      const resp = response.data
      console.log('responseRRRRRR2', resp);
      result=resp;
      console.log('result', result);
      store.update(resp.modelid, resp.id, {...resp} );
      console.log('result', result);
      setCurrent(resp);
    }).catch( function (error) {
    console.log('error', error);
  });
  console.log('result', result);
  return result;
}

 const EditRow = (edited, isNew, setCurrent)  => {
    //console.log('isNew', isNew );
    console.log('edited', edited );
    const flag = edited.id===-1 ||!isNew;
    const row = {...edited, editing:flag};
    console.log('row1_', row );
    setCurrent(row);
};

// login set localStorage
export const loginSet = (profile) => {
    // HTTP header
    axios.defaults.headers['Authentication'] = `Bearer ${profile.token}`
    window.localStorage.setItem('profile', JSON.stringify(profile))
}

// logout remove localStorage
export const logoutUnset = () => {
    // HTTP header
    delete axios.defaults.headers['Authentication']
    window.localStorage.removeItem('profile')
}
export  {Get, Get1, Get2, Post, Login,  Add, Edit, EditRow}

