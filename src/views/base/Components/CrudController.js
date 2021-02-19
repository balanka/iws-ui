import axios from "axios";

 const Edit = (url, profile, record, data, setCurrent) => {
     axios.patch( url, record, {headers: {'authorization':profile.token}})
      .then(response => {
        const index = data.findIndex(obj => obj.id === record.id);
        data[index]= record;
        setCurrent(record);
      }).catch(function (error) {
         console.log('error', error);
       });
  };
    const Add = (url, profile, record, data, initialState, setCurrent) => {
    axios.post(url, record, {headers: {'authorization':profile.token}})
      .then(response => {
        const i = data.findIndex(obj => obj.id === record.id);
        const index = i === -1? data.length+1:i;
        data[index]=record;
        const row = {...initialState, editing:false};
        //setEditing(false);
        setCurrent(row);
      }).catch(function (error) {
        console.log('error', error);
      });
  };
    const Post = (url, profile, record, ctx) => {
     axios.patch(url.concat(ctx), record, {headers: {'authorization':profile.token}})
      .then(response => {
        //console.log('responsex', response.data);
      }).catch(function (error) {
      console.log('error', error);
    });
  };
  const login = (history, url, data, setProfile) => {
        axios.post( url, data)
            .then(response => {
                const {authorization} = response.headers
                //console.log('response', response);
                //console.log('history', history);
                const profile = {token:authorization, company:response.data.company
                    , modules:response.data.menu};
                setProfile(profile);
                //setProfile(previous => (profile));
                //loginSet(profile);
            }).catch(function (error) {
            console.log('error', error);
           // history.push(routes.user.login)
        });
    }

  const Get = (url, profile, func) => {
      let result
          axios.get( url, {headers: {'authorization':profile.token}})
            .then(response => {
                const resp = response.data
                func(resp);
                result={...resp};
                console.log('resp', resp);
                return resp;
            }).catch(function (error) {
            //console.log('authorization', profile.token);
              if(JSON.stringify(error).includes("401")) {
                  console.log('error', "Session expired!!!!! Login again!!!!");
              }

                console.log('error', error);
            })
            return result;
        }

    const Query = (event, url, profile, func, init) => {
        const fetchData =(url_, profile, call)=>{
            const res = Get(url_, profile, call);
            console.log("resx"+url_);
            const datax = res?res : init;
            return datax;
        }
        fetchData(url, profile, func);
        event.preventDefault();
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
export  { Query,Get, Post, login,  Add, Edit}

