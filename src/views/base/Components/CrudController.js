import axios from "axios";
import {MASTERFILE, MENU} from "./Menu";
import iwsStore from './Store';
import React from "react";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Edit = (url, token, record, data,  setCurrent) => {
  var result;
  console.log('put url', url);
  axios.put(url, record, {headers: {'Authorization': `Bearer ${token}`}})
    .then(response => {
      const resp = response.data
      console.log('response', response);
      const index = data.findIndex(obj => {
        return obj ? (obj.id === record.id) : false
      });
      data[index] = resp;
      result = resp;
      setCurrent(resp);
      console.log('resultX', result);
    }).catch(function (error) {
    console.log('error', error);
  });
  console.log('resultX', result);
  return result;
  };

const Edit2 = (url, token, record, data,  setCurrent) => {
  var result;
  console.log('post url', url);
  axios.post(url, record, {headers: {'Authorization': `Bearer ${token}`}})
    .then(response => {
      const resp = response.data
      console.log('response', response);
      const index = data.findIndex(obj => {
        return obj ? (obj.id === record.id) : false
      });
      data[index] = resp;
      result = resp;
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
   console.log('Adding', record);
   axios.post(url, record, {headers: {'Authorization': `Bearer ${token}`}})
     .then(response => {
       const resp = response.data
       const index = data.length + 1;
       data[index] = resp;
       result = resp;
       console.log('response', resp);
       setCurrent(resp);
     }).catch(function (error) {
     console.log('error', error);
   });
   return result;
  };
 const Post = (url, profile, record) => {
   axios.patch(url, record, {headers: {'Authorization': `Bearer ${profile.token}`}})
     .then(response => {
       console.log('responsex', response.data);
     }).catch(function (error) {
     console.log('error', error);
   });
  };
const importFn =(str)=> React.lazy(() => import(`${str}`));
 const Login = (history, url, data, setProfile, t, setMenu, setModule, setRoutes) => {
   axios.post(url, data)
     .then(response => {
       const token = response.data.hash
       console.log(" token>>>>>>>>>>>>", token);
       const userMenu = response.data.menu.toString().split(",").map(e=>parseInt(e));
       const profile = {
         token: token, company: response.data.company
         , modules: userMenu
       };
       setProfile(profile);
       const moduleURL = SERVER_URL.concat(MASTERFILE.moduleURL);
       axios.get(moduleURL, {headers: {'Authorization': `Bearer ${token}`}})
         .then(response => {
           const module_ = response.data
           iwsStore.put(400, module_);
           console.log(" module>>>>>>>>>>>>", module_);
           const menu = module_.filter(e=>userMenu.includes(parseInt(e.id))).map(m => m.path).filter(p => p !== '/');
           console.log(" filtered menu>>>>>>>>>>>>", menu);
           const menu_t = MENU(t);
           const routes_t =module_.map(e=> {return {...e, component: e.description?importFn(e.description):undefined}});
           const newMenu = new Map([...menu_t].filter(([k, _]) => menu.includes(k)));
           const newRoutes = routes_t.filter(r => menu.includes(r.path))
           setModule(module_);
           setMenu(newMenu);
           setRoutes(newRoutes);
         }).catch(function (error) {
         console.log('Error', error);
         if (JSON.stringify(error).includes("401")) {
           console.log('error', "Session expired!!!!! Login again!!!!");
           history.push("/login");
         }
         console.log('error', error);
       });
       history.push("/dashboard");
       // console.log("authorization:", authorization);
       // console.log("profile:", profile);
       // console.log("response:", response);
     }).catch(function (error) {
     console.log('error', error);
     // history.push(routes.user.login)
   });
    }
 const Get = (url, token, history, func) => {
   let result;
   axios.get(url, {headers: {'Authorization': `Bearer ${token}`}})
     .then(response => {
       const resp = response.data
       console.log('responseRRRRRR', resp);
       func ? func(resp) : void (false);
       result = {...resp};
       console.log('resp', resp);

     }).catch(function (error) {
     console.log('Error', error);
     if (JSON.stringify(error).includes("401")) {
       console.log('error', "Session expired!!!!! Login again!!!!");
       history.push("/login");
     }

     console.log('error', error);
   })
   console.log('resultRRRRRR', result);
   return result;
        }

const Get1 = (url, token,  key_) => {
  let result;
  console.log('url', url);
  console.log('key_', key_);
  axios.get(url, {headers: {'Authorization': `Bearer ${token}`}})
    .then(response => {
      const resp = response.data
      console.log('key_', key_);
      console.log('respRRRRRR', resp);
      iwsStore.put(key_, resp);
      console.log('iwsStore.get(key_)', iwsStore.get(key_));
      result = {...resp};
    }).catch(function (error) {
    console.log('error', error);
  })
  console.log('resultRRRRRR', result);
  return result;
}

const Get2 =  (url, token, setCurrent) => {
  let result;
  console.log('url', url);
  axios.get(url, {headers: {'Authorization': `Bearer ${token}`}})
    .then(response => {
      const resp = response.data
      console.log('responseRRRRRR2', resp);
      result = resp;
      console.log('result', result);
      iwsStore.update(resp.modelid, resp.id, {...resp});
      console.log('result', result);
      Array.isArray(resp)&&resp.length>0?setCurrent(resp[0]):setCurrent(resp)
      //setCurrent(resp);
    }).catch(function (error) {
    console.log('error', error);
  });
  console.log('result', result);
  return result;
}

 const EditRow = (edited, isNew, setCurrent)  => {
   const flag = edited.id === -1 || !isNew;
   const row = {...edited, editing: flag};
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
export  {Get, Get1, Get2, Post, Login,  Add, Edit, Edit2, EditRow}

