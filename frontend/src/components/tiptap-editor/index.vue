<template>
  <div class="editor" :class="{ 'editor--show': !editable }" v-if="editor">

    <menu-bar v-if="editable" class="editor__header" :editor="editor" />
    <div class="editor__content-wrapper">
      <editor-content class="editor__content" :editor="editor" />
      <div v-if="modelValue == '' || modelValue == '<p></p>'" class="editor__content-placeholder">
        متن خود را وارد کنید ...
      </div>
    </div>

  </div>
</template>

<script>
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import history from '@tiptap/extension-history'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { Editor, EditorContent } from '@tiptap/vue-3'
import MenuBar from './MenuBar.vue'
import { Upload } from './upload'
import { Image } from './image'
// import Placeholder from '@tiptap/extension-placeholder'
// import Document from '@tiptap/extension-document'


// const CustomDocument = Document.extend({
//   content: 'heading  block*',
// })

export default {
  components: {
    EditorContent,
    MenuBar,
  },
  props: {
    modelValue: String,
    editable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        // CustomDocument,
        StarterKit.configure({
          history: false,
          // document: false,
        }),
        // Placeholder.configure({
        //   placeholder: ({ node }) => {
        //     if (node.type.name === 'heading') {
        //       return 'عنوان مطلب خود را وارد کنید'
        //     }

        //     return 'متن اصلی خود را وارد کنید...'
        //   },
        // }),
        Image,
        Upload,
        Highlight,
        TaskList,
        TaskItem,
        history,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
      ],
      content: this.modelValue,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        this.$emit('update:modelValue', html)
      },
      editable: this.editable,
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
  watch: {
    modelValue(value) {
      // assumes that value is the HTML value, keeps the cursor at the same position
      if (value === this.editor.getHTML()) {
        return;
      }
      // a change as happened, update the content, cursor is at the start of the editor,
      // however, that is no big deal, assume it's a different content anyways.
      this.editor.commands.setContent(value);
    }
  }
}

</script>

<style  lang="scss">
.editor {
  background-color: #FFF;
  // border: 3px solid #6D6C80;
  // border-radius: 0.75rem;
  color: #0D0D0D;
  display: flex;
  flex-direction: column;

  &__header {
    align-items: center;
    background: #6D6C80;
    border-bottom: 3px solid #6D6C80;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    max-height: 26rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2.25em 0;
    -webkit-overflow-scrolling: touch;
    z-index: 2;

    &-placeholder {
      position: absolute;
      outline: 0;
      width: 100%;
      height: 40px;
      border: none;
      margin: 2.7em 0;
      resize: none;
      box-sizing: border-box;
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      z-index: 1;
      bottom: 0;
      color: #8593A6;
    }
  }

}


/* Basic editor styles */
.ProseMirror {

  opacity: 0.75;

  &-focused {
    outline: none;
    border: none;
    opacity: 1;
  }

  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #6D6C80;
    border-radius: 0.5rem;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-right: 2px solid rgba(#0d0d0d, 0.1);
    padding-right: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }
    }
  }
}

.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: right;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}


.editor.editor--show {
  border: 0;

  & .editor__content {
    padding: 0;
  }
}
</style>
