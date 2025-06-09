declare module '@/components/modals/*/AddCity_Portal' {
  import React from 'react';
  const component: React.FC;
  export default component;
}

declare module '@/components/modals/*/AddBookForm_Portal' {
  import React from 'react';
  const component: React.FC;
  export default component;
}

declare module '@/components/modals/*/BookModalPortal' {
  import React from 'react';
  const component: React.FC;
  export default component;
}

declare module '@/components/modals/*/TargetUser_Portal' {
  import React from 'react';
  const component: React.FC;
  export default component;
}

// Можна й загальніше (якщо хочеш підтримати всі портали в цій папці)
declare module '@/components/modals/*/*_Portal' {
  import React from 'react';
  const component: React.FC;
  export default component;
}
