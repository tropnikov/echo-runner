import { cloneElement, FC, ReactElement } from 'react';

import styles from './FeatureCard.module.css';

export interface FeatureInfo {
  text: string;
  icon: ReactElement;
  description: string;
}

interface FeatureCardProps {
  feature: FeatureInfo;
}

const FeatureCard: FC<FeatureCardProps> = ({ feature }) => (
  <div>
    <div className={styles.featureCardIcon}>{cloneElement(feature.icon)}</div>
    <div>
      <h3>{feature.text}</h3>
      <p>{feature.description}</p>
    </div>
  </div>
);

export default FeatureCard;
