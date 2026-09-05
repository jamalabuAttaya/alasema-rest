import { memo, useMemo } from 'react';
import { FaBullseye, FaEye, FaGem } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { cardVariants, useIsMobile, viewportOnce } from '../../animations/motionVariants';

const MISSIONS = Object.freeze([
  { Icon: FaEye, titleKey: 'ourVision', textKey: 'visionText' },
  { Icon: FaBullseye, titleKey: 'ourMission', textKey: 'missionText' },
  { Icon: FaGem, titleKey: 'ourValues', textKey: 'valuesText' },
]);

function MissionVision() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const missions = useMemo(
    () => MISSIONS.map((item) => ({
      ...item,
      title: t(item.titleKey),
      text: t(item.textKey),
    })),
    [t]
  );

  return (
    <div className="mission-vision">
      {missions.map(({ Icon, title, text, titleKey }, index) => (
        <motion.article
          className="mission-card"
          key={titleKey}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce(isMobile)}
          variants={cardVariants(isMobile)}
          whileHover={isMobile ? undefined : { y: -8 }}
        >
          <span className="mission-icon"><Icon aria-hidden="true" /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </motion.article>
      ))}
    </div>
  );
}

export default memo(MissionVision);
