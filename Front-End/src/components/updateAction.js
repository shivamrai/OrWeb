export default function updateAction(state, payload) {
  return {
    ...state,
    setupDetails: {
      ...state.setupDetails,
      ...payload
    }
  };
}
