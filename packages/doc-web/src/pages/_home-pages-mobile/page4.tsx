/*
 * @Author: yang.zhang04 yang.zhang04@weimob.com
 * @Date: 2023-03-28 10:48:02
 * @LastEditors: yang.zhang04 yang.zhang04@weimob.com
 * @LastEditTime: 2023-03-28 11:02:55
 * @FilePath: \bos-fe-titian-web\packages\doc-web\src\pages\_home-pages-mobile\page3 copy.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import clsx from 'clsx';
import React from 'react';
import Feat from '../_components-mobile/feature';
import styles from './page4.module.scss';

function Page() {
  const topContent = [
    {
      img: 'https://image-c.weimobwmc.com/sass-admin/6e7a13406bbf43db9a976fd6186f136c.png',
      title: '前沿技术',
      desc: 'Typescript , Vite , Web Components<br />Pnpm , Esbuild',
    },
    {
      img: 'https://image-c.weimobwmc.com/sass-admin/34d11cd5072d437fa98552b933e77750.png',
      title: '多种能力',
      desc: '完美支持Web Components, Vue, React<br />以及多渠道小程序',
      background: 'linear-gradient(59.05deg, #FAFAFA 0%, rgba(255, 255, 255, 0) 81.25%)',
    },
    {
      img: 'https://image-c.weimobwmc.com/sass-admin/67153caa65cd4d83b63a75dc75b39545.png',
      title: '优雅美学',
      desc: '开箱即用，便捷轻松地构建精致漂<br />亮的UI界面',
      background: 'linear-gradient(270deg, #FAFAFA 0%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      img: 'https://image-c.weimobwmc.com/sass-admin/d4dbb47766284465a520ca02ef9b7e06.png',
      title: '直观定制',
      desc: '灵活而又强大的组件能力，随心所<br />欲地创建复杂的主题',
    },
    {
      img: 'https://image-c.weimobwmc.com/sass-admin/f48b821d92d247d4b6eb0b2a133e5949.png',
      title: '交互示例',
      desc: '网页、手机双端演示交互示例，更<br />好的上手体验',
    },
    {
      img: 'https://image-c.weimobwmc.com/sass-admin/102b88e761d14cb7ac475757263eae2a.png',
      title: '文档清晰',
      desc: '简练精确的说明文档，便于开发者<br />快速上手',
      background: 'linear-gradient(120.95deg, #FAFAFA 0%, rgba(255, 255, 255, 0) 81.25%)',
    },
  ];
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx(styles.main)}>
        {topContent.map(el => (
          <Feat position="top" {...el} key={el.title} />
        ))}
      </div>
    </div>
  );
}

export default React.memo(Page);
