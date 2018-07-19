import { FunctionalComponentOptions } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

const name = 'MFlexFiller'
const prefix = 'm-flex-filler'

@Component({ functional: true } as FunctionalComponentOptions)
export default class MFlexFiller extends Vue {
    public render() {
        return (
            <div class={prefix} />
        )
    }
}
