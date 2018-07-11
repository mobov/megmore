<template>
    <m-container>
        <m-row space="xs">
            <m-col sm=3>
                <m-button type="primary" @click="modal=true">asd</m-button>
                <m-button type="primary" @click="modal=true">asd</m-button>
            </m-col>
            <m-col sm=6>
                <m-date-picker elevation=2></m-date-picker>
            </m-col>
            <m-col sm=3>
                <m-button type="primary" shape="circle">C</m-button>
                <m-button type="primary" variety="outline">outline</m-button>
                <m-button type="primary" variety="outline" shape="round">round</m-button>
            </m-col>
        </m-row>
        <m-button @click="modal=true">modal</m-button>
        <m-button @click="confirm">confirm</m-button>
        <m-modal title="标题zz" :show.sync="modal">
            <m-button @click="modalInner=true">modal</m-button>
            <m-button @click="drawer=true">drawer</m-button>
            <m-modal :width="300" :show.sync="modalInner"></m-modal>
        </m-modal>
        <m-button color="primary" loading @click="fullscreenModal=true">fullscreen modal</m-button>
        <m-modal :show.sync="fullscreenModal" :fullscreen="true" @click.native="log">
        </m-modal>
        <m-spin size="xs"></m-spin>
        <m-drawer :show.sync="drawer"></m-drawer>
    </m-container>
</template>

<script lang="tsx">
export default {
    name: 'Home',
    data(){
        return {
            modal:false,
            modalInner:false,
            fullscreenModal:false,
            drawer:true
        }
    },
    methods: {
	    handleAvatarClose () {

        },
	    handleAvatarClick () {

        },
        async confirm(){
            await this.$confirm({
                title:'dsa',
                content(h: any){
                    return (
                        <span>
                            sssssssssssss
                        </span>
                    )
                }
            })
            console.log('confirm')
        }
    }
}
</script>
