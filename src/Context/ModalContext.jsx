import { createContext, useReducer } from 'react';

export const ModalContext = createContext();

const initialState = {
  isLoginModal: false,
  isRegisterModal: false,
  isProfileModal: false,
  isFormCategory: false,
  isAddEpisode: false,
  isEditEpisode: false,
  isDeleteConfirmation: false,
};

const reducer = (state, action) => {
  const { type, _ } = action;

  switch (type) {
    case 'LOGIN_MODAL':
      return {
        isLoginModal: true,
        isRegisterModal: false,
      };

    case 'DELETE_CONFIRMATION_MODAL':
      return {
        isDeleteConfirmation: true,
      };
    case 'FORM_CATEGORY_MODAL':
      return {
        isFormCategory: true,
      };
    case 'ADD_EPISODE_MODAL':
      return {
        isAddEpisode: true,
      };
    case 'EDIT_EPISODE_MODAL':
      return {
        isEditEpisode: true,
      };
    case 'PROFILE_UPDATE_MODAL':
      return {
        isProfileModal: true,
      };
    case 'REGISTER_MODAL':
      return {
        isLoginModal: false,
        isRegisterModal: true,
      };
    case 'CLOSE_AUTH_MODAL':
      return {
        isLoginModal: false,
        isRegisterModal: false,
        isProfileModal: false,
        isFormCategory: false,
        isAddEpisode: false,
        isDeleteConfirmation: false,
      };
    default:
      throw new Error();
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ModalContext.Provider value={[state, dispatch]}>{children}</ModalContext.Provider>;
};
