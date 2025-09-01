import { ComponentType } from 'react';

import { Helmet } from 'react-helmet-async';

import { title as siteTitle } from '@/constants/siteConfig';
import { MetaData } from '@/types/Meta';

/**
 * HOC для добавления мета-данных к странице через Helmet
 */
export function withMeta<T extends object>(Component: ComponentType<T>, metaData: MetaData): ComponentType<T> {
  const ComponentWithMeta = (props: T) => {
    const fullTitle = `${metaData.title} | ${siteTitle}`;

    return (
      <>
        <Helmet>
          <title>{fullTitle}</title>
          <meta name="description" content={metaData.description} />

          {metaData.keywords && <meta name="keywords" content={metaData.keywords} />}

          {/* Open Graph мета-теги */}
          <meta property="og:title" content={fullTitle} />
          <meta property="og:description" content={metaData.description} />

          {metaData.url && <meta property="og:url" content={metaData.url} />}

          {/* Twitter мета-теги */}
          <meta name="twitter:title" content={fullTitle} />
          <meta name="twitter:description" content={metaData.description} />

          {/* Запрет индексации если нужно */}
          {metaData.noIndex && <meta name="robots" content="noindex, nofollow" />}

          {/* Дополнительные мета-теги */}
          {metaData.additionalMeta?.map((meta, index) => (
            <meta
              key={index}
              {...(meta.name ? { name: meta.name } : {})}
              {...(meta.property ? { property: meta.property } : {})}
              content={meta.content}
            />
          ))}
        </Helmet>
        <Component {...props} />
      </>
    );
  };

  ComponentWithMeta.displayName = `withMeta(${Component.displayName || Component.name})`;

  return ComponentWithMeta;
}
