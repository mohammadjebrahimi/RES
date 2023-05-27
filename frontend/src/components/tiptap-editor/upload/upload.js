
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { defaultUploader } from './default-uploader'
import { Extension } from '@tiptap/core'

export const uploadConfig = {
    uploader: defaultUploader,
    enableHtmlFileUploader: false,
    uploadWidgetFactory: (pos, spec) => {
        const widgetDOM = document.createElement('span')
        widgetDOM.textContent = 'Upload in progress...'
        return Decoration.widget(pos, widgetDOM, spec)
    },
}

const pluginKey = new PluginKey('MILKDOWN_UPLOAD')

const findPlaceholder = (state, id) => {
    const decorations = pluginKey.getState(state)
    if (!decorations)
        return -1
    const found = decorations.find(undefined, undefined, (spec) => spec.id === id)
    if (!found.length)
        return -1
    return found[0]?.from ?? -1
}

const handleUpload = (view, event, files, editor) => {
    if (!files || files.length <= 0)
        return false
    const id = Symbol('upload symbol')
    const { schema } = editor
    const { tr } = view.state
    const insertPos = event.clientX && event.clientY
        ? view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos ?? tr.selection.from
        : tr.selection.from
    view.dispatch(tr.setMeta(pluginKey, { add: { id, pos: insertPos } }))

    const { uploader } = uploadConfig
    uploader(files, schema)
        .then((fragment) => {
            const pos = findPlaceholder(view.state, id)
            if (pos < 0)
                return

            view.dispatch(
                view.state.tr
                    .replaceWith(pos, pos, fragment)
                    .setMeta(pluginKey, { remove: { id } }),
            )
        })
        .catch((e) => {
            console.error(e)
        })
    return true
}

export const Upload = Extension.create({
    name: 'upload',
    addProseMirrorPlugins() {
        return [new Plugin({
            key: pluginKey,
            state: {
                init() {
                    return DecorationSet.empty
                },
                apply(tr, set) {
                    const _set = set.map(tr.mapping, tr.doc)
                    const action = tr.getMeta(this)
                    if (!action)
                        return _set

                    if (action.add) {
                        const { uploadWidgetFactory } = uploadConfig

                        const decoration = uploadWidgetFactory(action.add.pos, { id: action.add.id })
                        return _set.add(tr.doc, [decoration])
                    }
                    if (action.remove) {
                        const target = _set.find(undefined, undefined, (spec) => spec.id === action.remove.id)
                        return _set.remove(target)
                    }

                    return _set
                },
            },
            props: {
                decorations(state) {
                    return pluginKey.getState(state)
                },
                handlePaste: (view, event) => {
                    const { enableHtmlFileUploader } = uploadConfig
                    if (!event)
                        return false
                    if (!enableHtmlFileUploader && event.clipboardData?.getData('text/html'))
                        return false

                    return handleUpload(view, event, event.clipboardData?.files, this.editor)
                },
                handleDrop: (view, event) => {
                    if (!event)
                        return false

                    return handleUpload(view, event, event.dataTransfer?.files, this.editor)
                },
            },
        })]
    }
})

