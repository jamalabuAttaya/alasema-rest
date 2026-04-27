import { useLanguage } from '../../context/LanguageContext';

function MissionVision() {
  const { t } = useLanguage();

  const missions = [
    { icon: 'fa-eye', title: t('ourVision'), text: t('visionText') },
    { icon: 'fa-bullseye', title: t('ourMission'), text: t('missionText') },
    { icon: 'fa-gem', title: t('ourValues'), text: t('valuesText') },
  ];

  return (
    <div className="mission-vision">
      {missions.map((mission, index) => (
        <div className="mission-card" key={index}>
          <i className={`fas ${mission.icon}`}></i>
          <h3>{mission.title}</h3>
          <p>{mission.text}</p>
        </div>
      ))}
    </div>
  );
}

export default MissionVision;