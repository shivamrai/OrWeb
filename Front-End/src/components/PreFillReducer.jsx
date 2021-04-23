// export default (state, action) => {
//   switch(action.type) {
//     case 'ADD_DATA':
//       return {
//         ...state,
//         setupDetails: {
//           action.payload,
//           ...state.setupDetails,
//         };
//     default:
//       return state;
//   }
// }
const PreFillReducer = (state,action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'ADD_DETAILS':
      return{
        ...state,
        setupDetails: action.payload
      };
    default: return state;
  };
};

export default PreFillReducer;
