<template>
  <m-app>
    <m-app-bar @click.native="log">
      <m-icon name="menu" />
    </m-app-bar>
    <m-icon name="menu" @click="log"/>
    <router-view/>
  </m-app>
</template>
