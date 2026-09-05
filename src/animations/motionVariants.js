import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

export const spring = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
};

export const springSoft = {
  type: 'spring',
  stiffness: 100,
  damping: 25,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const stagger = (delay = 0.18, staggerChildren = 0.12) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren: delay },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const cardVariants = (isMobile) => ({
  hidden: { opacity: 0, y: isMobile ? 14 : 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * (isMobile ? 0.03 : 0.07), ...springSoft },
  }),
});

export const cardHover = {
  y: -7,
  boxShadow: '0 18px 36px rgba(0,0,0,0.14)',
  transition: springSoft,
};

export const imageHover = {
  scale: 1.05,
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const tapEffect = { scale: 0.97 };

export const blurLoad = {
  hidden: { filter: 'blur(12px)', opacity: 0.2, scale: 1.02 },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45 },
  },
};

export const menuItemVariants = (isMobile) => ({
  hidden: { opacity: 0, x: isMobile ? -8 : -12 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * (isMobile ? 0.015 : 0.025), duration: 0.25 },
  }),
});

export const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + index * 0.1, duration: 0.35 },
  }),
};

export const viewportOnce = (isMobile) => ({
  once: true,
  margin: isMobile ? '-10px' : '-40px',
  amount: isMobile ? 0.08 : 0.18,
});
