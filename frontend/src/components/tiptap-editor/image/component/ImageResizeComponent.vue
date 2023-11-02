<template>
    <NodeViewWrapper class="tiptap-image">
        <figure ref="tiptap_image__figure_ref" class="tiptap-image__figure">
            <img :src="node.attrs.src" :alt="node.attrs.alt" :isDraggable="node.attrs.isDraggable"
                className='tiptap-image__image' />
        </figure>
        <NodeViewContent class="tiptap-image__content" as="p" />
        <!-- <div>{{ node.attrs.title }}</div> -->
    </NodeViewWrapper>
</template>
<script setup lang="ts">
/* eslint-disable jsx-a11y/anchor-is-valid */
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import {  onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps(nodeViewProps)

const isEditable = ref(props.editor.options.editable)
const resizeObserve = ref<any>(null)
const tiptap_image__figure_ref = ref(null)


const onResize = (e:any) => {
    if (e[0].target.style.width && e[0].target.style.height && this ) {
            (this as any).updateAttributes({
            width: e[0].target.style.width,
            height: e[0].target.style.height
        })
    }

}

onMounted(() => {
    if (isEditable.value) {
        resizeObserve.value = new ResizeObserver(onResize)
        resizeObserve.value.observe(tiptap_image__figure_ref.value)
    }

})

onBeforeUnmount(() => {
resizeObserve.value.unobserve(tiptap_image__figure_ref.value)

})
</script>
<style scoped lang="scss">
.tiptap-image {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__figure {
        resize: v-bind('props.editor.options.editable ? "both" : "none"');
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