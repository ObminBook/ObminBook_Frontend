import { Book } from '@/types/Book';

interface PortalProps {
  onClose: () => void;
}

interface BookModalPortalProps extends PortalProps {
  onUserClick: () => void;
  book: Book;
}

interface TargetUserPortalProps extends PortalProps {
  targetUserId: number | string;
}

declare module '@/components/modals/*/AddCity_Portal' {
  import React from 'react';
  export const AddCityPortal: React.FC<PortalProps>;
}

declare module '@/components/modals/*/AddBookForm_Portal' {
  import React from 'react';
  export const AddBookFormPortal: React.FC<PortalProps>;
}

declare module '@/components/modals/*/BookModalPortal' {
  import React from 'react';
  export const BookModalPortal: React.FC<BookModalPortalProps>;
}

declare module '@/components/modals/*/TargetUser_Portal' {
  import React from 'react';
  export const TargetUserPortal: React.FC<TargetUserPortalProps>;
}

// Загальна декларація для інших порталів, якщо знадобиться
declare module '@/components/modals/*/*_Portal' {
  import React from 'react';
  export const Portal: React.FC;
}
