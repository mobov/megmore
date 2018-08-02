import { FunctionalComponentOptions } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

const prefix = 'm-flex-box'

@Component({ functional: true } as FunctionalComponentOptions)
export default class MFlexFiller extends Vue {
    public render() {
        return (
            <div class={prefix} />
        )
    }
}
