<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link class="lianjie" title="笔记" to="/note"><i class="iconfont icon-note"></i></router-link>
      <router-link class="lianjie" title="笔记本" to="/notebooks"><i class="iconfont icon-notebook"></i></router-link>
      <router-link class="lianjie" title="回收站" to="/trash"><i class="iconfont icon-trash"></i></router-link>
    </div>
<!--    <div class="logout" @click="onLogout">-->
    <div class="logout" >
      <i class="iconfont icon-logout" @click="logout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue';
import request from '@/helpers/request.js';

export default {
  name: 'SideBar',
  components: {Avatar},
  methods:{
    logout(){
      console.log('logout');
      request('/auth/logout').then(data=>{
        this.$router.push({path:'login'})
        console.log(data)
      })
    }
  }

}
</script>

<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;
}
.icons {
  margin-top: 15px;

  a {
    padding: 6px 0;
    display: block;
  }
}

.icons .router-link-active {
  background-color: #5e6266;
}
.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.iconfont {
  color: #fff;
}
</style>
