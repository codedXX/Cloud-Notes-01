<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id" :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.friendlyCreatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '../apis/notebooks';
import { friendlyDate } from '@/helpers/util'

window.Notebbooks=Notebooks;

export default {
  name: 'NotebookList',
  data () {
    return {
      notebooks: []
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })

    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  methods: {
/*
    onCreate() {
      let title = window.prompt('创建笔记本')
      if(title.trim() === '') {
        alert('笔记本名不能为空')
        return
      }
      Notebooks.addNotebook({ title })
        .then(res => {
          console.log(res)
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
    },*/
    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        return Notebooks.addNotebook({title: value})
      }).then(res => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg)
        console.log('success',res)

      })
    },

    onEdit(notebook) {
      this.$prompt('修改标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符',
        inputValue:notebook.title
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '输入新笔记本标题: ' + value
        });
        Notebooks.updateNotebook(notebook.id, { title:value})
          .then(res => {
            notebook.title = value
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
      // console.log('edit...', notebook)
      // let title = window.prompt('修改标题', notebook.title)
      // Notebooks.updateNotebook(notebook.id, { title })
      //   .then(res => {
      //     console.log(res)
      //     notebook.title = title
      //     alert(res.msg)
      //   })
    },

    onDelete(notebook) {

      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        Notebooks.deleteNotebook(notebook.id)
          .then(res => {
            this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

      // console.log('delete', notebook)
      // let isConfirm = window.confirm('你确定要删除吗?')
      // if(isConfirm) {
      //   Notebooks.deleteNotebook(notebook.id)
      //     .then(res => {
      //       console.log(res)
      //       this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
      //       alert(res.msg)
      //     })
      // }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
