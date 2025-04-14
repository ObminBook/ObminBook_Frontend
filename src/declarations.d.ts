declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module './components/Chat/Chat' {
  import { FC } from 'react';
  export const Chat: FC;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
