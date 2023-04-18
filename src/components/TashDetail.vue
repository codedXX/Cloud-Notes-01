<template>
  <div>
    <h1>{{msg}}:{{$route.query.noteId}}</h1>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
export default {
  name: 'TrashDetail',
  data(){
    return {
      msg:'回收站'
    }
  },
  created(){
    Auth.getInfo()
      .then(res=>{
        if(!res.isLogin)
        {
          this.$router.push({path:'/login'})
        }
      })
  }
}
</script>

<style scoped>

</style>
