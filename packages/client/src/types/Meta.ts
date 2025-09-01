export interface MetaData {
  /** Заголовок страницы */
  title: string;
  /** Описание страницы */
  description: string;
  /** Ключевые слова */
  keywords?: string;
  /** URL страницы для og:url */
  url?: string;
  /** Должна ли страница индексироваться поисковиками */
  noIndex?: boolean;
  /** Дополнительные мета-теги */
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}
