<template>
  <m-app>
    <m-app-bar @click.native="log" color="pink-300" font-color="white">
      <m-button shape="circle" variety="flat" size="lg" @click="drawer=true">
        <m-icon name="menu" ></m-icon>
      </m-button>
      <m-flex-filler />
      <m-button variety="flat" size="lg">
        <span>哈哈</span>
      </m-button>
      <m-button shape="circle" variety="flat" size="lg">
        <m-icon name="account_circle"></m-icon>
      </m-button>
      <m-button shape="circle" variety="flat" size="lg">
        <m-icon name="more_vert"></m-icon>
      </m-button>
      <m-avatar variety="outline" type="danger" shape="circle" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3643687533,272026720&fm=58"></m-avatar>
    </m-app-bar>
    <!--<router-view />-->
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

