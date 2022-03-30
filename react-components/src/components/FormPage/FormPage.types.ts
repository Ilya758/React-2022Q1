import { RefObject } from 'react';

export type TUserRefs = {
  fullName: RefObject<HTMLInputElement>;
  male: RefObject<HTMLInputElement>;
  female: RefObject<HTMLInputElement>;
  file: RefObject<HTMLInputElement>;
  html: RefObject<HTMLInputElement>;
  css: RefObject<HTMLInputElement>;
  js: RefObject<HTMLInputElement>;
  birthday: RefObject<HTMLInputElement>;
  city: RefObject<HTMLSelectElement>;
  email: RefObject<HTMLInputElement>;
  agreed: RefObject<HTMLInputElement>;
};

export type TUserErrorsKeys =
  | 'fullName'
  | 'role'
  | 'file'
  | 'skills'
  | 'birthday'
  | 'city'
  | 'email'
  | 'agreed';

export type TUserErrors = Record<TUserErrorsKeys, boolean>;

export interface IUserData {
  fullName: string;
  role: string;
  file: string;
  skills: {
    html: boolean;
    css: boolean;
    js: boolean;
  };
  birthday: string;
  city: string;
  email: string;
}

export interface IState {
  cards: IUserData[];
  validate: boolean;
  formIsDirty: boolean;
  formHasBeenTriedToSubmit: boolean;
  success: boolean;
  //   errors: TUserErrors;
}
