type TProps = 'heading' | 'leftBtn' | 'rightBtn' | 'leftPath' | 'rightPath';

export interface IHeader {
  pageChars: THeaderProps;
}

export type THeaderProps = {
  [prop in TProps]: string;
};
