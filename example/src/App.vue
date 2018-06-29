<template>
  <m-app>
    <m-app-bar @click.native="log">
      <m-icon name="menu" />
    </m-app-bar>
    <router-view/>
  </m-app>
</template>
