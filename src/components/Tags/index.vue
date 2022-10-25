<template>
  <div class="tags">
    <el-tag
        v-for="itemTag in Tags"
        :key="itemTag.path"
        :closable="itemTag.name!=='home'"
        :effect="$route.name ===itemTag.name ?'dark' :'plain'"
        @click="goTagComponent(itemTag)"
        @close="closeTagAndSubTabList(itemTag)">
        {{itemTag.label}}
    </el-tag>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: {
    //点击tag跳转
    goTagComponent(itemTag) {
      if (itemTag.name!== this.$route.name) {
        this.$router.push(itemTag.path)
      }
    },
    //删除tag并跳转到对应的组件
    closeTagAndSubTabList(itemTag) {
      this.$store.commit('CLOSETAGANDSUBTABLIST', itemTag);
      const index=this.Tags.length-1
      this.$router.replace(this.Tags[index].path)
    }
   },
  computed: {
    Tags() {
      return this.$store.state.Tab.tabList
    }
  }
}
</script>
<style scoped lang="less">
.tags{
  margin-left:10px; 
  .el-tag{
    margin-left:8px; 
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

</style>