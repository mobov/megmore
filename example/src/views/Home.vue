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
        <m-button color="primary" loading @click="bottomSheet=true">bottomSheet</m-button>
        <m-modal :show.sync="fullscreenModal" :fullscreen="true" @click.native="log">
        </m-modal>
        <m-bottom-sheet :show.sync="bottomSheet"></m-bottom-sheet>
        <m-spin size="xs"></m-spin>
       
        <MExpansionPanel style="width:500px;margin:0 auto">
            <MExpansionPanelContent v-for="item in 10">
                <template slot="header">
                    title
                </template>
                <template>
                     <m-popover>
                        <m-button color="primary" loading @click="bottomSheet=true">bottomSheet</m-button>
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
      bottomSheet: false
    };
  },
  methods: {
    handleAvatarClose() {},
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
  }
};
</script>
