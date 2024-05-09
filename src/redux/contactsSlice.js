import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
    error: null,
  },
  filters: {
    name: '',
    /* },
    reducers: {
        addContact: {
        reducer(state, action) {
            state.items.push(action.payload);
        },
        prepare(contact) {
            return {
            payload: {
                id: nanoid(),
                ...contact,
            },
            };
        },
        },

        deleteContact(state, action) {
        const index = state.items.findIndex(
            contact => contact.id === action.payload
        );
        state.items.splice(index, 1);
        }, */
    },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const selectContacts = state => state.contacts.items;
