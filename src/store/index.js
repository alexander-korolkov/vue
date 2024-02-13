import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            confirmationDialog: {
                isOpen: false,
                message: '',
                resolve: null,
                reject: null,
            },
        };
    },
    mutations: {
        openConfirmationDialog(state, payload) {
            state.confirmationDialog.isOpen = true;
            state.confirmationDialog.message = payload.message;
            state.confirmationDialog.resolve = payload.resolve;
            state.confirmationDialog.reject = payload.reject;
        },
        closeConfirmationDialog(state) {
            state.confirmationDialog.isOpen = false;
        },
    },
    actions: {
        confirmAction({ commit }, { message }) {
            return new Promise((resolve, reject) => {
                commit('openConfirmationDialog', { message, resolve, reject });
            });
        },
        resolveConfirmation({ commit }) {
            commit('closeConfirmationDialog');
            state.confirmationDialog.resolve();
        },
        rejectConfirmation({ commit }) {
            commit('closeConfirmationDialog');
            state.confirmationDialog.reject();
        },
    },
});