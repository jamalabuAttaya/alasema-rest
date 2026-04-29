import { memo, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const MISSION_ICONS = Object.freeze(['fa-eye', 'fa-bullseye', 'fa-gem']);
const MISSION_KEYS = Object.freeze([
  { titleKey: 'ourVision', textKey: 'visionText' },
  { titleKey: 'ourMission', textKey: 'missionText' },
  { titleKey: 'ourValues', textKey: 'valuesText' },
]);

function MissionVision() {
  const { t } = useLanguage();

  const missions = useMemo(() => 
    MISSION_KEYS.map((keys, i) => ({
      icon: MISSION_ICONS[i],
      title: t(keys.titleKey),
      text: t(keys.textKey),
    })),
    [t]
  );

  return (
    <div className="mission-vision">
      {missions.map((mission, index) => (
        <div className="mission-card" key={index}>
          <i className={`fas ${mission.icon}`} aria-hidden="true"></i>
          <h3>{mission.title}</h3>
          <p>{mission.text}</p>
        </div>
      ))}
    </div>
  );
}

export default memo(MissionVision);