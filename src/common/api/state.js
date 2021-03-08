// Imports
import { atom } from 'recoil'
import {formEnum} from '../../utils/FORMS'

export const PROFILE = atom({
  key: 'profile',
  default: {
    token:'noTOken',
    company:'',
    modules:[]
  }
});

//const a1=`$formEnum.COSTCENTER`
export const COSTCENTER = atom({
  key: formEnum.COSTCENTER,
  default: {
    data:[]
  }
})

// notification
export const commonNotification = atom({
  key: 'commonNotification',
  default: {
    isVisible: false,
    message: ''
  }
})

export const CRUDSTATE = atom({
  key: 'CRUDSTATE',
  default:{
    form:'', get:'', title:'', url:'', accUrl:'', ccUrl:'', bankUrl:''
    , submitAdd:'', submitGet:'', submitEdit:'', submitPost:'', login:''
    , setEditing:'', current:'', setCurrent:'', initialState:'', initAcc:''
    , initCc:'', headers:'', modelid:'', deleteUser:'', submitQuery:''}
})
