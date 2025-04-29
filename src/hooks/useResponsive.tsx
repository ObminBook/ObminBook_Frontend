import { useMediaQuery } from 'react-responsive';

const useResponsive = (): number => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  if (isMobile) return 2;
  if (isTablet) return 6;
  if (isDesktop) return 3;

  return 4;
};

export default useResponsive;
