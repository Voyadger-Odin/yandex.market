import {defineStore} from "pinia";

export const usePageStore = defineStore('pageStore', {
    state: () => ({
        modals: [],
    }),
    actions: {
        openModal(modal_name) {
            this.modals.push(modal_name)
            document.body.style.cssText = `overflow: hidden;`
        },

        closeModal(modal_name) {
            this.modals.splice(this.modals.indexOf(modal_name), 1)
            if (this.modals.length === 0){
                document.body.style.cssText = `overflow: scroll;`
            }
        },
    },
})