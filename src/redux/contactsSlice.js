import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';
import { selectFilter } from './filtersSlice';

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const handleAddContactPending = state => {
    state.loading = true;
};

const handleDeleteContactPending = state => {
    state.loading = true;
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
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
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, state => {
                state.loading = false;
                state.error = true;
            })
            .addCase(addContact.pending, handleAddContactPending)
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handleDeleteContactPending)
            .addCase(deleteContact.rejected, handleRejected),
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = state => state.contacts.items;

export const selectLoading = state => state.contacts.loading;

export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, contactsFilter) => {
        return contacts.filter(contact => contact.name.includes(contactsFilter));
    }
);
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