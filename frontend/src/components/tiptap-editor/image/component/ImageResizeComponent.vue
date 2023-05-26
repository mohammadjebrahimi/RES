<template>
    <NodeViewWrapper class="tiptap-image">
        <figure ref="tiptap-image__figure-ref" class="tiptap-image__figure">
            <img :src="node.attrs.src" :alt="node.attrs.alt" :isDraggable="node.attrs.isDraggable"
                className='tiptap-image__image' />
        </figure>
        <NodeViewContent class="tiptap-image__content" as="p" />
        <!-- <div>{{ node.attrs.title }}</div> -->
    </NodeViewWrapper>
</template>
<script>
/* eslint-disable jsx-a11y/anchor-is-valid */
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
    components: { NodeViewWrapper, NodeViewContent },
    props: nodeViewProps,
    methods: {
        onResize(e) {
            if (e[0].target.style.width && e[0].target.style.height) {
                this.updateAttributes({
                    width: e[0].target.style.width,
                    height: e[0].target.style.height
                })
            }

        },


    },
    data() {
        return {
            isEditable: this.editor.options.editable,
            resizeObserve: null
        }
    },
    mounted() {
        if (this.isEditable) {
            this.resizeObserve = new ResizeObserver(this.onResize)
            this.resizeObserve.observe(this.$refs['tiptap-image__figure-ref'])
        }

    },

    beforeUnmount() {
        this.resizeObserve.unobserve(this.$refs['tiptap-image__figure-ref'])

    },

}
</script>
<style scoped lang="scss">
.tiptap-image {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__figure {
        resize: v-bind('editor.options.editable ? "both" : "none"');
        overflow: hidden;
        line-height: 0;
        width: v-bind('node.attrs.width');
        height: v-bind('node.attrs.height');
        max-width: 100%;
    }

    &__image {
        height: 100%;
        width: 100%;
    }

    &__content {
        min-width: 1rem;
        min-height: 1rem;
    }
}
</style>