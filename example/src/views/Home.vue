<template>
    <m-container>
        <m-row space="xs">
            <m-col :sm=4>
                <m-time-picker picker-type="datetime" value-format="Date" v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=4>
                <m-time-picker picker-type="date" value-format="Date" v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=4>
                <m-time-picker picker-type="time" value-format="Date" ampm v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=4>
                <m-button type="primary" @click="modal=true">asd</m-button>
                <m-button type="primary" @click="modal=true">asd</m-button>
            </m-col>
            <m-col :sm=4>
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
        <m-button color="primary" loading @click="bottomSheet=true">bottomSheet</m-button>
        <m-modal :show.sync="fullscreenModal" :fullscreen="true" @click.native="log">
        </m-modal>
        <m-bottom-sheet :show.sync="bottomSheet"></m-bottom-sheet>
        <m-spin size="xs"></m-spin>
        <div style="display: flex">
            <m-text-field></m-text-field>
            <m-text-field label-float></m-text-field>
        </div>
        <MExpansionPanel style="width:500px;margin:0 auto">
            <MExpansionPanelContent v-for="item in 30">
                <template slot="header">
                    title
                </template>
                <template>
                     <m-popover placement="right">
                        <m-date-picker v-model="dateValue" :elevation=2></m-date-picker>
                        <m-button slot="ref">Popover</m-button>
                    </m-popover>
                </template>
            </MExpansionPanelContent>
        </MExpansionPanel>
        
    </m-container>
</template>

<script lang="tsx">
export default {
  name: "Home",
  data() {
    return {
      modal: false,
      modalInner: false,
      fullscreenModal: false,
      drawer: true,
      bottomSheet: false,
      dateValue: new Date()
    };
  },
  methods: {
    handleAvatarClose() {

    },
    handleAvatarClick() {},
    async confirm() {
      await this.$confirm({
        title: "dsa",
        content(h: any) {
          return <span>sssssssssssss</span>;
        }
      });
      console.log("confirm");
    }
  },
    mounted(){
      // setInterval(()=>{
      //     this.dateValue = new Date(1999)
      //     console.log( this.dateValue)
      // },1000)
    }
};
</script>
