<template>
  <m-app>
    <m-app-bar @click.native="log" color="pink-400" font-color="white" size="md" :elevation="2">
      <m-button shape="circle" :elevation="0" icon="menu" />
      <m-button shape="circle" @click="drawer=true">
        <m-icon name="menu" ></m-icon>
      </m-button>
      <m-flex-filler />
      <m-button shape="circle" :elevation="0" icon="account_circle" />
      <m-button shape="circle" :elevation="0" icon="more_vert" />
      <!--<m-button shape="circle" variety="flat">-->
        <!--<m-icon name="account_circle"></m-icon>-->
      <!--</m-button>-->
      <m-button shape="circle" :elevation="0">
        <m-icon name="more_vert">qweqwe</m-icon>
      </m-button>
      <m-avatar variety="outline" shape="circle"
                src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3643687533,272026720&fm=58">
        A
      </m-avatar>
      <m-avatar shape="circle"
                src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3643687533,272026720&fm=58">
        A
      </m-avatar>
    </m-app-bar>
    <router-view />
    <!--<m-drawer :show.sync="drawer" />-->
  </m-app>
</template>
<script lang="tsx">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
const name = "MDatePicker";
const prefix = "m-date-picker";

@Component({
  name: "App"
})
export default class App extends Vue {
  private drawer = false;
}
</script>

