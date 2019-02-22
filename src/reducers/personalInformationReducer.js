import { SAVE_PERSONAL_INFORMATION } from "../constants/actionTypes";
import objectAssign from "object-assign";
import initialState from "./initialState";

/* export default function personalInformationSavingsReducer(
  state = initialState.personalInformation,
  action
) {
  let newState;
  console.log(action.payload);

  switch (action.type) {
    case SAVE_PERSONAL_INFORMATION:
      return objectAssign({}, state, {
        piInformation: action.payload
      });
    default:
      return state;
  }
}
 */

export default function personalInformationSavingsReducer(state = {}, action) {
  console.log(action.payload);

  switch (action.type) {
    case SAVE_PERSONAL_INFORMATION:
      return { pending: false, piApiResponse: action.payload };
    default:
      return state;
  }
}
