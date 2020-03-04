import {loginData} from "../../../api/login/index.js"
let modules = {
    namespaced:true,
    state:{
        nickname:"",
        isLogin:false,
        uid:"",
        token:""
    },
    mutations:{
       login(state,payload){
             console.log(payload)
           loginData(payload).then(res=>{
              if(payload.success){
                  payload.success(res);
              }
              console.log(res)
               if(res.code==200){
                   localStorage['nickname']=res.data.nickname;
                   localStorage['uid']=res.data.uid;
                   localStorage['token']=res.data.auth_token;
                    localStorage['isLogin']=true;
                   state.nickname=res.data.nickname;
                   state.isLogin=true;
                   state.uid=res.data.uid;
                   state.token=res.data.token;
               }else{

               }
           })
       }
    },
    actions:{
        login(conText,payload){
            conText.commit("login",payload)
        }
    }
}
export default modules;