import React from 'react';

import { Space } from 'antd';

import styles from './SectionBlock.module.css';

interface SectionBlockProps {
  className?: string;
  children: React.ReactNode;
}

const SectionBlock: React.FC<SectionBlockProps> = ({ className, children }) => (
  <div className={className}>
    <Space direction="vertical" size="large" className={styles.sectionBlockSpace}>
      {children}
    </Space>
  </div>
);

export default SectionBlock;
