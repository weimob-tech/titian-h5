import { useState } from 'react';
import { TiButton, TiPopup } from '@titian-design/react';

export default function () {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <TiButton
        onClick={() => {
          console.log(visible);
          setVisible(!visible);
        }}
      >
        按钮
      </TiButton>
      <TiPopup visible={visible} onClose={() => setVisible(false)}>
        内容展示
      </TiPopup>
    </div>
  );
}
