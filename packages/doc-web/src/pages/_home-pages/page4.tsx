import clsx from 'clsx';
import React from 'react';
import AnimationBox from '../_components/animation-box';
import Feat from '../_components/feature';
import styles from './page4.module.scss';

function Page({ display, leaving }: { display: string; leaving: boolean }) {
  const topContent = [
    {
      img: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/qianyanjishu.png',
      title: '前沿技术',
      desc: 'Typescript , Vite , Web Components<br />Pnpm , Esbuild',
    },
    {
      img: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/duozhongnengli.png',
      title: '多种能力',
      desc: '完美支持Web Components, Vue, React<br />以及多渠道小程序',
      background: 'linear-gradient(0deg, #FAFAFA 0%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      img: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/jiaohuyanshi.png',
      title: '交互示例',
      desc: '网页、手机双端演示交互示例，更<br />好的上手体验',
    },
  ];
  const bottomContent = [
    {
      img: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/youyameixue.png',
      title: '优雅美学',
      desc: '开箱即用，便捷轻松地构建精致漂<br />亮的UI界面',
      background: 'linear-gradient(180deg, #FAFAFA 0%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      img: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/zhiguandingzhi.png',
      title: '直观定制',
      desc: '灵活而又强大的组件能力，随心所<br />欲地创建复杂的主题',
    },
    {
      img: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/wendangqingxi.png',
      title: '文档清晰',
      desc: '简练精确的说明文档，便于开发者<br />快速上手',
      background: 'linear-gradient(180deg, #FAFAFA 0%, rgba(255, 255, 255, 0) 100%)',
    },
  ];
  return (
    <div className={clsx(styles.page)} style={{ display }}>
      <AnimationBox position="top" leaving={leaving} className={clsx(styles.top)}>
        {topContent.map(el => (
          <Feat position="top" {...el} key={el.title} />
        ))}
      </AnimationBox>
      <AnimationBox position="bottom" leaving={leaving} className={clsx(styles.bottom)}>
        {bottomContent.map(el => (
          <Feat position="bottom" {...el} key={el.title} />
        ))}
      </AnimationBox>
    </div>
  );
}

export default React.memo(Page);
