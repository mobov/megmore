import Vue, { PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions, RenderContext, VNode } from 'vue'
import { ENXIO } from 'constants';

export interface Megmore {
  install: PluginFunction<MegmoreUseOptions>
  version?: string
}
export default Megmore

interface MegmoreTheme {
  [key: string]: any
}

interface MegmoreIcons {
  [key: string]: any
}
export interface MegmoreUseOptions {
  components?: Record<string, PluginObject<any> | PluginFunction<never>>
  theme?: Partial<MegmoreTheme> | false
  icons?: Partial<MegmoreIcons> | false
  // options?: Partial<MegmoreOptions>
}



