import {
    mergeAttributes,
    Node,
    nodeInputRule,
} from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageResizeComponent from "./component/ImageResizeComponent.vue"

export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const Image = Node.create({
    name: "image",
    content: 'text*',
    isolating:true,
    inline() {
        return this.options.inline
    },

    group() {
        return this.options.inline ? 'inline' : 'block'
    },

    draggable: true,


    addCommands() {
        return {
            setImage: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },


   
    addOptions() {
        return {
            inline: false,
            allowBase64: false,
            HTMLAttributes: {},
        }
    },
    addAttributes() {
        return {
            src: {
                default: null,
                renderHTML: (attributes) => {
                    return {
                        src: attributes.src
                    };
                }
            },
            alt: {
                default: null,
                renderHTML: (attributes) => {
                    return {
                        alt: attributes.alt
                    };
                }
            },
            title: {
                default: null,
                renderHTML: (attributes) => {
                    return {
                        title: attributes.title
                    };
                }
            },
            width: {
                default: '200px',
                renderHTML: (attributes) => {
                    return {
                        width: attributes.width
                    };
                }
            },
            height: {
                default: 'auto',
                renderHTML: (attributes) => {
                    return {
                        height: attributes.height
                    };
                }
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'image-resizer',

            },
        ]
    },

    renderHTML({ HTMLAttributes }) {

        return ['image-resizer', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
            , 0
        ]
    },

    addNodeView() {
        return VueNodeViewRenderer(ImageResizeComponent)
    },
    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: match => {

                    const [, , alt, src, title, height, width] = match
                    return { src, alt, title, height, width }
                },
            }),
        ]
    },


})