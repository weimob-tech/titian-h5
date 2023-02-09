import ClipboardJS from 'clipboard';
import clsx from 'clsx';
import React, { useState } from 'react';
import { TiDivider } from '@titian-design/mobile-react';
import styles from './index.module.scss';

function Tabs() {
  const [tab, setTab] = useState(0);
  const [btnText, setBtnText] = useState('Copy Code');
  const red = '#FA2C19';
  const green = '#07C160';
  const menus = [
    {
      tab: 'MiniProgram',
      content: `npm install @titian-design/weapp <br />
      <span style="color: #fff">"usingComponents": {</span><br />
        <span style="color: #fff">&nbsp;&nbsp;"ti-button": </span><span style="color: ${red}">"@titian-design/weapp/button/index"</span><br />
      <span style="color: #fff">}</span><br />
    `,
      text: `npm i @titian-design/weapp
"usingComponents": {
  "ti-button": "@titian-design/weapp/button/index"
}`,
    },
    {
      tab: 'React',
      content: `
      npm install @titian-design/mobile-react <br />
      <span style="color: ${green}">import</span>&nbsp;&nbsp;<span style="color: #fff">React</span>&nbsp;&nbsp;<span style="color: ${green}">from</span>&nbsp;&nbsp<span style="color: ${red}">'react'</span><br />
      <span style="color: ${green}">import</span>&nbsp;&nbsp;<span style="color: #fff">{ TiButton }</span>&nbsp;&nbsp;<span style="color: ${green}">from</span>&nbsp;&nbsp;<span style="color: ${red}">'@titian-design/mobile-react'</span><br />
    `,
      text: `npm install @titian-design/mobile-react
import React from 'react'
import { TiButton } from '@titian-design/mobile-react'`,
    },
    {
      tab: 'Vue',
      content: `
      npm install @titian-design/mobile-vue <br />
      <span style="color: ${green}">import</span>&nbsp;&nbsp;<span style="color: #fff">{ createApp }</span>&nbsp;&nbsp;<span style="color: ${green}">from</span>&nbsp;&nbsp<span style="color: ${red}">'vue'</span><br />
      <span style="color: ${green}">import</span>&nbsp;&nbsp;<span style="color: #fff">{ TitianUI }</span>&nbsp;&nbsp;<span style="color: ${green}">from</span>&nbsp;&nbsp;<span style="color: ${red}">'@titian-design/mobile-vue'</span><br />
      <span style="color: ${green}">import</span>&nbsp;&nbsp;<span style="color: #fff">App</span>&nbsp;&nbsp;<span style="color: ${green}">from</span>&nbsp;&nbsp;<span style="color: ${red}">'./App.vue'</span><br />
      <span style="color: ${green}">const</span>&nbsp;&nbsp;<span style="color: #fff">app&nbsp;&nbsp;=</span>&nbsp;&nbsp;<span style="color: ${green}">createApp</span><span style="color: #fff">(App)</span><br />
      <span style="color: #fff">app.</span><span style="color: ${green}">use</span><span style="color: #fff">(TitianUI).</span><span style="color: ${green}">mount</span><span style="color: #fff">('#app')</span>
    `,
      text: `npm install @titian-design/mobile-vue
import { createApp } from  'vue'
import { TitianUI } from '@titian-design/mobile-vue'
import  App  from  './App.vue'
const  app  =  createApp(App)
app.use(TitianUI).mount('#app')`,
    },
  ];
  const copy = () => {
    const clipboard = new ClipboardJS('.copy-btn', {
      text() {
        return menus[tab].text;
      },
    });
    clipboard.on('success', () => {
      setBtnText('Copy Success');
      setTimeout(() => {
        setBtnText('Copy Code');
      }, 1000);
    });
  };
  return (
    <div className={clsx(styles.tabs)}>
      <div className={clsx(styles.menus)}>
        {menus.map((el, index) => (
          <div
            className={clsx(styles.menu, tab === index && styles.active)}
            style={{ zIndex: tab === index ? menus.length : menus.length - index }}
            onClick={() => setTab(index)}
            onKeyDown={() => {}}
            role="presentation"
            key={el.tab}
          >
            {el.tab}
          </div>
        ))}
      </div>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.line)}>
          {[...Array(6)].map((el, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={idx}>{idx + 1}</span>
          ))}
        </div>
        <TiDivider color="#4D4D4D" orientation="vertical" />
        <div className={clsx(styles.code)} dangerouslySetInnerHTML={{ __html: menus[tab].content }} />
        <div
          className={clsx(styles.btn, 'copy-btn', btnText === 'Copy Success' && styles.success)}
          onClick={copy}
          onKeyDown={() => {}}
          role="presentation"
        >
          {btnText}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Tabs);
