declare module '@/components/modals/*/AddCity_Portal' {
  import React from 'react';
  export const AddCityPortal: React.FC;
}

declare module '@/components/modals/*/AddBookForm_Portal' {
  import React from 'react';
  export const AddBookFormPortal: React.FC;
}

declare module '@/components/modals/*/BookModalPortal' {
  import React from 'react';
  export const BookModalPortal: React.FC;
}

declare module '@/components/modals/*/TargetUser_Portal' {
  import React from 'react';
  export const TargetUserPortal: React.FC;
}

// Загальна декларація для будь-яких порталів з іменованим експортом
declare module '@/components/modals/*/*_Portal' {
  import React from 'react';
  export const Portal: React.FC;
}
