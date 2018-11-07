<template>
    <m-container style="padding:20px">
        <m-row space="xs">
            <MTooltip>
                <m-button  loading>fullscreen modal</m-button>
            </MTooltip>
            <m-col>
                <m-button @click="selectedData.push('Cupcake')">烦烦烦 广告费</m-button>
                <m-table class="m--mb-lg"
                         :data="tableData"
                         :selected="selectedData"
                         key-field="name"
                         select="multi"
                         expand="single"
                         :expanded="expandedData"
                         height="600px"
                         header="sticky"
                         hover="row"
                         border>
                    <m-table-column type="expand" width="100"/>
                    <m-table-column type="select" width="100"/>
                    <m-table-column title="name" field="name" width="300" align="left"/>
                    <m-table-column title="calories" width="300" field="calories" />
                    <m-table-column width="300">
                        <span>自定义标题吼吼</span>
                        <template slot-scope="scope">
                            自定义内容{{scope.name}}
                        </template>
                    </m-table-column>
                    <div class="m--p-xl" slot="expand"  slot-scope="scope">
                        表格expand内容{{scope}}
                    </div>
                    <!--多级表头追加-->
                    <template slot="head-extra">
                        <tr>
                            <td rowspan="2">店铺哦及</td>
                            <td colspan="3">sad</td>
                        </tr>
                        <tr>
                            <td>店铺哦及</td>
                            <td colspan="2">sad</td>
                        </tr>
                    </template>
                </m-table>
                {{selectedData}}
                <m-table ref="dataTable"
                    class="m--mb-lg"
                    :data="tableData"
                    :selected.sync="selectedData"
                    key-field="name"
                    select="single"
                    expand="single"
                    row-select
                    row-expand
                    height="300px"
                    hover="row">
                    <m-table-column type="select" width="80"/>
                    <m-table-column title="name" field="name" />
                    <m-table-column title="calories" field="calories" />
                    <template slot="expand" slot-scope="scope">
                        表格expand内容{{scope}}
                    </template>
                </m-table>
                <!--<m-table class="m&#45;&#45;mb-lg"-->
                         <!--:data="tableData"-->
                         <!--row-check-->
                         <!--check-field="isCheck"-->
                         <!--hover="row">-->
                    <!--<m-table-column type="checkbox" width="80"/>-->
                    <!--<m-table-column title="name" field="name" width="300" align="left"/>-->
                    <!--<m-table-column title="calories" width="300" field="calories" />-->
                    <!--<m-table-column width="auto">-->
                        <!--<div>自定义标题</div>-->
                        <!--<template slot-scope="scope">-->
                            <!--自定义内容{{scope.name}}-->
                        <!--</template>-->
                    <!--</m-table-column>-->
                    <!--<template slot="expand" slot-scope="scope">-->
                        <!--表格expand内容{{scope}}-->
                    <!--</template>-->
                    <!--<template slot="head-prepend">-->
                        <!--表头前置内容-->
                    <!--</template>-->
                    <!--<template slot="head-append">-->
                        <!--表头后置内容-->
                    <!--</template>-->
                <!--</m-table>-->
            </m-col>
        </m-row>
        <m-select filerable  chips    placement-x="right-start" v-model="select">
            <m-option :label="'编号'+item" :value="item" v-for="item in 10" :key="item">
                编号{{item}}
            </m-option>
        </m-select>
        <m-button @click="$toast('啊啊啊啊啊啊啊啊啊啊',{type:'warning'})">openToast</m-button>
        <MProgressLinear></MProgressLinear>
        <MProgressCircle></MProgressCircle>
        <MTab>
            <MTabItem v-for="item in 20" :key="item" :label="renderTabLabel(item)" :name="`label${item}`">
                <div>
                    {{item}}
                </div>
                <div>
                    {{item}}
                </div>
                <div>
                    {{item}}
                </div>
                <div>
                    {{item}}
                </div>
                <div>
                    {{item}}
                </div>
                <div>
                    {{item}}
                </div>
            </MTabItem>
        </MTab>
        <m-row space="xs">
            <m-col :sm="4">
                <div>
                    <m-checkbox v-model="checkbox" :label="checkAll">所有</m-checkbox>
                    <m-checkbox v-for="check in checkAll" v-model="checkbox" :label="check">{{check}}</m-checkbox>
                </div>
                <div>
                    <m-checkbox v-model="checkboolean" :label="true">boolean</m-checkbox>
                </div>
                <div>
                    <m-radio v-model="radio" disabled label="radio1">萌萌啊</m-radio>
                    <m-radio v-model="radio" label="radio2">萌萌啊</m-radio>
                    <m-radio v-model="radio" label="radio3">萌萌啊</m-radio>
                    <m-radio v-model="radio" label="radio4">萌萌啊</m-radio>
                </div>
            </m-col>
            <m-col :sm="4">
                <div class="m--mb-md" style="display: flex;align-items: flex-end; flex-wrap: wrap">
                    <m-chip class="m--mr-sm" size="xs" closeable>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="sm" type="success" @close="">
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="warning" @close="" closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="default" @close="" closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="pure" @close="" closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="legacy" @close="" closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="lg" type="danger">
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="xl" type="info">
                        <span>呵呵</span>
                    </m-chip>
                </div>
                <div class="m--mb-md" style="display: flex;align-items: flex-end; flex-wrap: wrap">
                    <m-chip class="m--mr-sm" size="xs" variety="outline" closeable>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="sm" type="success" variety="outline"  @close="">
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="warning" @close="" variety="outline"  closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="default" @close="" variety="outline"  closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="pure" @close="" variety="outline"  closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="md" type="legacy" @close="" variety="outline"  closetoggle>
                        <m-avatar slot="media" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532848823575&di=940fe99aec0381b8ef366c52ab006095&imgtype=0&src=http%3A%2F%2Fwww.wodeyiku.com%2Fuploads3%2Fimage%2F201703%2F0301l1k3cuc3avi.jpg"></m-avatar>
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="lg" type="danger" variety="outline" >
                        <span>呵呵</span>
                    </m-chip>
                    <m-chip class="m--mr-sm" size="xl" type="info" variety="outline" >
                        <span>呵呵</span>
                    </m-chip>
                </div>

            </m-col>
            <m-col :sm=4>
                <m-time-picker picker-type="datetime" desync confirmation value-format="Date" v-model="dateValue" :elevation=2 />
            </m-col>
            <!--<m-col :sm=4>-->
                <!--<m-time-picker picker-type="date" value-format="Date" v-model="dateValue" :elevation=2 />-->
            <!--</m-col>-->
            <m-col :sm=4>
                <m-time-picker picker-type="time" value-format="Date" ampm v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=4>
                <m-time-picker picker-type="year" value-format="Date" ampm v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=4>
                <m-time-picker picker-type="month" value-format="Date" ampm v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=8>
                <m-time-picker picker-type="datetime" confirmation landscope value-format="Date" v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=8>
                <m-time-picker picker-type="datetime" landscope value-format="Date" v-model="dateValue" :elevation=2 />
            </m-col>
            <m-col :sm=4>
                <m-button color="primary" @click="modal=true">asd</m-button>
                <m-button color="primary" @click="modal=true">asd</m-button>
            </m-col>
            <m-col :sm=4>
                <m-button color="primary" shape="circle">C</m-button>
                <m-button color="primary" variety="outline">outline</m-button>
                <m-button color="primary" variety="outline" shape="round">round</m-button>
            </m-col>
        </m-row>
        <m-button @click="modal=true">modal</m-button>
        <m-button @click="confirm">confirm</m-button>
        <m-modal title="标题zz" :show.sync="modal">
            <m-button @click="modalInner=true">modal</m-button>
            <m-button @click="drawer=true">drawer</m-button>
            <m-modal :width="300" :show.sync="modalInner"></m-modal>
            <m-drawer :width="300" :show.sync="drawer"></m-drawer>
        </m-modal>
        <m-button color="primary" loading @click="fullscreenModal=true">fullscreen modal</m-button>
        <m-button color="primary" loading @click="bottomSheet=true">bottomSheet</m-button>
        <m-modal :show.sync="fullscreenModal" :fullscreen="true" @click.native="log">
        </m-modal>
        <m-bottom-sheet :show.sync="bottomSheet"></m-bottom-sheet>
        <m-spin size="xs"></m-spin>
        <div style="display: flex">
            <m-text-field label="label"></m-text-field>
            <m-text-field label="label" label-float></m-text-field>
        </div>
        <m-toast ref="toast"></m-toast>
        <MExpansionPanel style="width:500px;margin:0 auto">
            <MExpansionPanelContent v-for="item in 30">
                <template slot="header">
                    title
                </template>
                <template>
                     <m-popover  placement-x="right-start">
                        <m-time-picker v-model="dateValue" :elevation=2></m-time-picker>
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
      drawer: false,
      bottomSheet: false,
      dateValue: new Date(),
      checkbox: [],
      checkboolean: false,
      checkAll: ['check1', 'check2', 'check3', 'check4'],
      radio: 1,
      select:[],
      selectedData: ['Eclair'],
      disSelectData: ['Cupcake'],
      expandedData: ['Lollipop'],
      tableData:  [
          {
              isCheck: true,
              name: 'Frozen Yogurt',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: 1
          },
          {
              isCheck: false,
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
              iron: 1
          },
          {
              isCheck: false,
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              iron: 7
          },
          {
              isCheck: false,
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              iron: 8
          },
          {
              isCheck: false,
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
              iron: 16
          },
          {
              isCheck: false,
              name: 'Jelly bean',
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
              iron: 0
          },
          {
              isCheck: true,
              name: 'Lollipop',
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
              iron: 2
          },
          {
              isCheck: false,
              name: 'Honeycomb',
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
              iron: 45
          },
          {
              isCheck: false,
              name: 'Donut',
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
              iron: 22
          },
          {
              isCheck: false,
              name: 'KitKat',
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
              iron: 6
          }
      ]
    };
  },
  methods: {
      renderTabLabel(num:number) {
         const arr=[]
         for(let i=0;i<=num;i++){
            arr.push('render')
         }
         return (h)=>{
            return (
              <div>
                {arr.map(number=>{
                    return (
                        <span>
                            'render'
                        </span>
                    )
                })}
              </div>
            )
         }
      },
    handleAvatarClose() {

    },
      openToast(){
        this.$refs.toast.visible=true
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
