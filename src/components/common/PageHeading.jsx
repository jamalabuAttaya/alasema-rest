import { memo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../animations/motionVariants';

function PageHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.header
      className="page-heading"
      initial="hidden"
      animate="visible"
      variants={stagger(0.06, 0.08)}
    >
      <motion.span className="page-kicker" variants={fadeUp}>{eyebrow}</motion.span>
      <motion.h1 className="page-title" variants={fadeUp}>{title}</motion.h1>
      {subtitle && <motion.p className="page-subtitle" variants={fadeUp}>{subtitle}</motion.p>}
      <motion.span className="heading-mark" variants={fadeUp} aria-hidden="true" />
    </motion.header>
  );
}

export default memo(PageHeading);
