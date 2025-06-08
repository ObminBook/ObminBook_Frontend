// HeaderSkeleton.tsx
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

const HeaderUserSkeleton: React.FC = () => {
  return (
    <div>
      <Skeleton height={42} width={42} circle />
    </div>
  );
};

export default HeaderUserSkeleton;
