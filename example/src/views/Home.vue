<template>
    <div class="home">
        <m-icon style="color:red;font-size: 50px"
                name="ac_unit"
                size="100"/>
        <m-avatar size="sm" @click="handleAvatarClick">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529431432654&di=ae676f70cc8f86de168540d686f3d028&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1993103690%2C3565942105%26fm%3D214%26gp%3D0.jpg"/>
        </m-avatar>
        <m-button type="primary" @click="modal=true">
            asd
        </m-button>
        <m-modal v-model="modal"></m-modal>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
	    handleAvatarClose () {

        },
	    handleAvatarClick () {

        }
    }
}
</script>
