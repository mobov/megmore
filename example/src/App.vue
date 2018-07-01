<template>
  <m-app>
    <m-app-bar @click.native="log">
      <a v-m-ripple>
        <m-icon name="menu" />
      </a>
    </m-app-bar>
    <router-view/>
  </m-app>
</template>
