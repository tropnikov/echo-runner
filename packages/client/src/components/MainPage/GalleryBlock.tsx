import { Col, Row } from 'antd';

import { galleryImages } from '@/constants/galleryImages';

import SectionBlock from './SectionBlock';
import SectionHeader from './SectionHeader';

import styles from './GalleryBlock.module.css';

const GalleryBlock = () => {
  const title = 'Галерея игры';
  const description = 'Посмотри на наш впечатляющий игровой процесс';

  return (
    <SectionBlock className="gallery-card">
      <SectionHeader title={title} description={description} />
      <Row gutter={[16, 16]} justify="center">
        {galleryImages.map((image, index) => {
          return (
            <Col key={index} xs={24} sm={12} md={6}>
              <div className={styles['gallery-block__image-wrapper']}>
                <img src={image.url} alt="Изображение галереи" className={styles['gallery-block__image']} />
              </div>
            </Col>
          );
        })}
      </Row>
    </SectionBlock>
  );
};

export default GalleryBlock;
