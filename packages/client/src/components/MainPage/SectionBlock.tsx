import { FC, ReactNode } from 'react';

import { Space } from 'antd';

import styles from './SectionBlock.module.css';

interface SectionBlockProps {
  className?: string;
  children: ReactNode;
}

const SectionBlock: FC<SectionBlockProps> = ({ children }) => (
  <Space direction="vertical" size="large" className={styles.sectionBlockSpace}>
    {children}
  </Space>
);

export default SectionBlock;
