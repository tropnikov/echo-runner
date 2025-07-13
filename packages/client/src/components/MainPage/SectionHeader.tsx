import { FC } from 'react';

import { Col, Row } from 'antd';

import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, description }) => (
  <Row justify="center">
    <Col className={styles.sectionHeaderCol}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Col>
  </Row>
);

export default SectionHeader;
