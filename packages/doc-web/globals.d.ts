declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare global {
  interface Window {
    Titian?: {
      mode?: 'pc' | 'h5';
      bubbles?: boolean;
      screenWidth?: number;
    };
  }
}
