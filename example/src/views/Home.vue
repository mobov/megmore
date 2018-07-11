<template>
    <m-container>
        <m-row space="xs">
            <m-col :sm="3">
                <m-button type="primary" @click="modal=true">
                asd
                </m-button>
            </m-col>
            <m-col :sm="6">
                <m-button type="primary" @click="modal=true">
                asd
                </m-button>
            </m-col>
            <m-col :sm="3">
                <m-button type="primary" shape="circle">
                C
                </m-button>
                <m-button type="primary" variety="outline">
                outline
                </m-button>
                <m-button type="primary" variety="outline" shape="round">
                round
                </m-button>
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
    </m-container>
    <!--<div class="home">-->
        <!--<m-icon style="color:red;font-size: 50px"-->
                <!--name="ac_unit"-->
                <!--size="100"/>-->
        <!--<m-avatar size="sm" @click="handleAvatarClick">-->
            <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529431432654&di=ae676f70cc8f86de168540d686f3d028&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1993103690%2C3565942105%26fm%3D214%26gp%3D0.jpg"/>-->
        <!--</m-avatar>-->
        <!--<m-button type="primary" @click="modal=true">-->
            <!--asd-->
        <!--</m-button>-->
    <!--</div>-->
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
