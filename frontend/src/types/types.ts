import { type Component } from 'vue';

type link = {
    name: string,
    params: { id: string }
}
export type tag = {
    id: string
    name: string
}

export type card = {
    authFigure: string
    authorName: string
    date: string
    title: string
    summery: string
    studyDuration: string
    tags: [tag]
    image?: string
    link?: link
}

export type carouselSlide = {
    carouselImage: string
    cardData: card
}

export type comment = {
    comment: string
    authorName: string
    date: string
}


export type textInput = {
    name: string,
    id: string,
    required?: boolean,
    label?: string,
    placeHolder: string[],
    ltr?: boolean,
    type?: string,
    value?: string,
}
export type fileInput = {
    name: string
    id: string
    label: string
    accept: string
    image: string
}

export type selectInput = {
    options: string[]
    name: string
    id: string
    label: string
    placeHolder: string
    ltr: boolean
    value?: string[]
    optionValue: string,
    onSearch?: (e:Event) => void
}

export type commentBootstrapSchema = {
    content: string
    email: string
    first_name: string
    last_name: string
}


export interface submitCommentEventShape extends Event {
    reply_to?: string | null,
    article_id?: number,
}

export interface tab {
    header: {
        count: number
        icon: string
        name: string
    },
    body: {
        component: Component
        props: {
            icon: string,
            title: string,
            description: string,
            is_seen: boolean,
        }[]
    }
}

export type tiptapEditorMenuItem = {
    icon?: string
    title?: string
    action?: VoidFunction
    isActive?: VoidFunction
    items?: tiptapEditorMenuItem[]
    type?: string
}

export type defaultFormComponentPropsShape = {
    schema?: any,
    action?: string
    title?: string
    description?: string
    submitText?: string
    alignToEnd?: boolean
}

