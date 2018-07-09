<template>
  <m-app>
    <m-app-bar @click.native="log">
      <m-button shape="circle" type="flat" size="lg">
        <m-icon name="menu"></m-icon>
      </m-button>
      <m-flex-filler />
      <m-button type="flat" size="lg">
        <span>哈哈</span>
      </m-button>
      <m-button shape="circle" type="flat" size="lg">
        <m-icon name="account_circle"></m-icon>
      </m-button>
      <m-button shape="circle" type="flat" size="lg">
        <m-icon name="more_vert"></m-icon>
      </m-button>
    </m-app-bar>
    <router-view></router-view>
  </m-app>
</template>
