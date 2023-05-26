import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { TiVirtualList } from '@titian-design/mobile-react';

export const VirtualListPage: FC = () => {
  const virtualListRef = useRef<HTMLTiVirtualListElement>(null);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    virtualListRef.current?.setListData(data);
  }, [data.length]);

  useEffect(() => {
    virtualListRef.current?.setRenderItem(item => `<div style="height: 50px; width: 100%;">${item}</div>`);
  }, []);

  const handle = useCallback(() => {
    setData(prev =>
      prev.concat(
        Array(10)
          .fill(0)
          .map((_, idx) => (data[data.length - 1] || 0) + idx + 1),
      ),
    );
  }, []);

  return <TiVirtualList ref={virtualListRef} onLoad={handle} />;
};
