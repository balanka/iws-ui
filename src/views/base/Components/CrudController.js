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
       const userMenux = response.data.menu.toString().split(",").map(e=>parseInt(e));
       console.log("userMenu>>>>>>>>>>>>", userMenux);
       const result = Map.groupBy(response.data.rights, ({ moduleid }) => moduleid);
       const userRights = Array.from(result, (entry) =>
                    ({ key: entry[0], value: entry[1].map(e=>e.short).reduce((a,b)=>a.concat(b)) }));
       const company = response.data.company
       const moduleURL = SERVER_URL.concat(MASTERFILE.module).concat("/").concat(data.company);
       axios.get(moduleURL, {headers: {'Authorization': `Bearer ${token}`}})
         .then(response => {
           const module_ = response.data
           iwsStore.put(400, module_);
           const moduleIds = module_.filter(e=>result.has(parseInt(e.id)))
           const userMenu = moduleIds.map(m => parseInt(m.id))
           const menu = moduleIds.map(m => m.path).filter(p => p !== '/');
           const menu_t = MENU(t);
           const routes_t = module_.map(e=> {return {...e, component: e.description?importFn(e.description):undefined}});
           const newMenu = new Map([...menu_t].filter(([k, _]) => menu.includes(k)));
           const newRoutes = routes_t.filter(r => menu.includes(r.path))
           const profile = {token: token, company:company, modules: userMenu, rights:userRights};
           setProfile(profile);
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

     }).catch(function (error) {
     console.log('error', error);

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


export  {Get, Get1, Get2, Post, Login,  Add, Edit,  EditRow}

