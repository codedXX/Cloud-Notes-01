import axios from 'axios'

//意思是对于所有的post请求都设置一个统一的header
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
axios.defaults.baseURL='https://note-server.hunger-valley.com'
axios.defaults.withCredentials=true

//如果type没传则默认为GET，data没传则默认为空对象。
export default function request(url,type='GET',data={}){
  return new Promise((resolve,reject)=>{
    let option = {
      url,
      method: type,
      withCredentials:true,
      //validateStatus(status)的意思是如果你的状态不满足这个条件，那么直接就catch
      validateStatus(status) {
        //如果你返回的数据是对的，那么你的状态码就发200，为了稳妥，就是200到300。如果你的数据出现了问题，那就发400
        return (status >=200 && status < 300) || status === 400
        /*只有状态码200或者400才会进入到
        if (res.status === 200) {
        resolve(res.data)
      }else{
        reject(res.data)
      }
        这里面，否则200或者400以外的状态码，就会进入到
        catch(err=>{
      reject({msg:'网络异常'})
       })
         */
      }
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      if (res.status === 200) {
        console.log(res.data)
        resolve(res.data)
      }else{
        console.log(res.data)
        reject(res.data)
      }
    }).catch(err=>{
      console.log({msg:'网络异常'})
      reject({msg:'网络异常'})
    })
  })
}





//正常的url应该是'http://note-server.hunger-valley.com/auth/login'
/*
request('/auth/login','POST',{username:'hunger',password:'123456'})
  .then(data=>{
    console.log(data)
  })
  */
