// react-type-animation.d.ts
declare module 'react-type-animation' {
    import React from 'react';
  
    interface TypeAnimationProps {
      sequence: (string | number)[];
      speed?: number;
      style?: React.CSSProperties;
      cursor?: boolean;
      deletionSpeed?: number;
    }
  
    export default function TypeAnimation(props: TypeAnimationProps): JSX.Element;
  }
  