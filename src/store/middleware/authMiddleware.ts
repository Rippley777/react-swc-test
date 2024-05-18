import { Action, ThunkAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserData, clearUser } from '../reducers/users';
import { RootState } from '../store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const auth = getAuth();

export const listenToAuthChanges = (): AppThunk => (dispatch: Dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Dispatch user info to the Redux store
      dispatch(
        setUserData({
          // uid: user.uid,
          email: user.email,
          // displayName: user.displayName,
        }),
      );
    } else {
      // Clear user info from the Redux store
      dispatch(clearUser());
    }
  });
};
