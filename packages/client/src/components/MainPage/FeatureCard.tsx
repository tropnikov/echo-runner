import React, { ReactElement } from 'react';

import styles from './FeatureCard.module.css';

export interface FeatureInfo {
  text: string;
  icon: ReactElement<any, any>;
  description: string;
}

interface FeatureCardProps {
  feature: FeatureInfo;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => (
  <div>
    <div className={styles['feature-card__icon']}>{React.cloneElement(feature.icon)}</div>
    <div>
      <h3>{feature.text}</h3>
      <p>{feature.description}</p>
    </div>
  </div>
);

export default FeatureCard;
