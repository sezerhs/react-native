import	{ extendObservable } from 'mobx';
import { configure } from "mobx"


configure({
    enforceActions: "never",
})

class UserStore {

	constructor(){
		extendObservable(this,{
			loading:true,
			isLoggedIn:false,
			username: ''
		})
	}
}




export default new UserStore();
