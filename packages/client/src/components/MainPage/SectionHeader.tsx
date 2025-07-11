import { Col, Row } from 'antd';

import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <Row justify="center">
    <Col span={12} className={styles['section-header__col']}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Col>
  </Row>
);

export default SectionHeader;
