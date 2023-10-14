<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
      <menu-dropdown v-else-if="item.type === 'dropdown'" :key="`d-${index}`" :title="item.title" :icon="item.icon"
        :items="item.items" />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import MenuDropdown from './MenuDropdown.vue';
import MenuItem from './MenuItem.vue'


const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

const {editor}=toRefs(props)
const items = ref([
  {
    icon: 'bold',
    title: 'Bold',
    action: () => editor.value.chain().focus().toggleBold().run(),
    isActive: () => editor.value.isActive('bold'),
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => editor.value.chain().focus().toggleItalic().run(),
    isActive: () => editor.value.isActive('italic'),
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => editor.value.chain().focus().toggleStrike().run(),
    isActive: () => editor.value.isActive('strike'),
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => editor.value.chain().focus().toggleCode().run(),
    isActive: () => editor.value.isActive('code'),
  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () => editor.value.chain().focus().toggleHighlight().run(),
    isActive: () => editor.value.isActive('highlight'),
  },
  {
    type: 'divider',
  },

  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => editor.value.chain().focus().setParagraph().run(),
    isActive: () => editor.value.isActive('paragraph'),
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => editor.value.chain().focus().toggleBulletList().run(),
    isActive: () => editor.value.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => editor.value.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.value.isActive('orderedList'),
  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    action: () => editor.value.chain().focus().toggleTaskList().run(),
    isActive: () => editor.value.isActive('taskList'),
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => editor.value.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.value.isActive('codeBlock'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => editor.value.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.value.isActive('blockquote'),
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => editor.value.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => editor.value.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => editor.value.chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run(),
  }, {
    type: 'divider',
  },
  {
    type: 'dropdown',
    icon: 'align-right',
    title: 'Align',
    items: [
      {
        icon: 'align-left',
        title: 'align-left',
        action: () => editor.value.chain().focus().setTextAlign('left').run(),
        isActive: () => editor.value.isActive({ textAlign: 'left' }),
      },
      {
        icon: 'align-right',
        title: 'align-right',
        action: () => editor.value.chain().focus().setTextAlign('right').run(),
        isActive: () => editor.value.isActive({ textAlign: 'right' }),
      },
      {
        icon: 'align-center',
        title: 'align-center',
        action: () => editor.value.chain().focus().setTextAlign('center').run(),
        isActive: () => editor.value.isActive({ textAlign: 'center' }),
      },
      {
        icon: 'align-justify',
        title: 'align-justify',
        action: () => editor.value.chain().focus().setTextAlign('justify').run(),
        isActive: () => editor.value.isActive({ textAlign: 'justify' }),
      }]
  },
  {
    type: 'dropdown',
    icon: 'heading',
    title: 'Heading',
    items: [
      {
        icon: 'h-1',
        title: 'Heading 1',
        action: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 1 }),
      },
      {
        icon: 'h-2',
        title: 'Heading 2',
        action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 2 }),
      }, {
        icon: 'h-3',
        title: 'Heading 3',
        action: () => editor.value.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 3 }),
      },
      {
        icon: 'h-4',
        title: 'Heading 4',
        action: () => editor.value.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 4 }),
      }, {
        icon: 'h-5',
        title: 'Heading 5',
        action: () => editor.value.chain().focus().toggleHeading({ level: 5 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 5 }),
      },
      {
        icon: 'h-6',
        title: 'Heading 6',
        action: () => editor.value.chain().focus().toggleHeading({ level: 6 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 6 }),
      },]
  },
  {
    type: 'divider',
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => editor.value.chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => editor.value.chain().focus().redo().run(),
  },

])

</script>

<style lang="scss">
.divider {
  background-color: rgba(#fff, 0.25);
  height: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.75rem;
  width: 1px;
}
</style>
