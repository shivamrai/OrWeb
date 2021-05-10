export default function updateAction(state, payload) {
    console.log('payload', payload);
    return {
        ...state,
        setupDetails: {
            ...state.setupDetails,
            ...payload
        }
    };
}
