export type FlexWrap = 'start' | 'end' | 'center' | 'around' | 'between'

export type FlexAlign = 'start' | 'end' | 'center' | 'stretch'

export type FlexJustify = 'start' | 'end' | 'center' | 'around' | 'between' | 'evenly'

export declare class MContainer {
    private id: string
    private tag: string
}

// export declare abstract class MRow extends MegComponent {
//     private id: string
//     private tag: string
//     private wrap: FlexWrap
//     private align: FlexAlign
//     private justify: FlexJustify
//     private space: Size
// }

// export declare class MCol extends MegComponent {
//     private id: string
//     private tag: string
//     private xs: number
//     private sm: number
//     private md: number
//     private lg: number
//     private xl: number
// }
