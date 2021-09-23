import { types } from "../types/types";

// Type to set an Error it returns the error info
export const setError = (err) => ( {
    type: types.uiSetError,
    payload: err
} );

// Type to remove the Error message
export const removeError = () => ( {
    type: types.uiRemoveError
} );

// Type to set the loading spinner
export const startLoading = () => ( {
    type: types.uiStartLoading
} );

// Type to end the loading spinner
export const finishLoading = () => ( {
    type: types.uiFinishLoading
} );