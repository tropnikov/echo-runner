import { useEffect, useState } from 'react';

import { baseBackEndUrl } from '../constants/apiEndpoint';
import { GetTopicListResponse } from '../types/Forum';

export const useTopicList = (pageNumber: number, pageSize: number) => {
  const [data, setData] = useState<GetTopicListResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        baseBackEndUrl +
        'topics?' +
        new URLSearchParams({ pageNumber: pageNumber.toString(), pageSize: pageSize.toString() }).toString();
      const response = await fetch(url);
      const result = (await response.json()) as GetTopicListResponse[];
      setData(result);
    };

    fetchData();
  }, [pageNumber, pageSize]);

  return { data };
};
