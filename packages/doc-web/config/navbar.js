const navbar = {
  logo: {
    alt: 'Titian UI Logo',
    src: 'img/logo.svg',
  },
  items: [
    {
      type: 'dropdown',
      position: 'right',
      label: '组件',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'sidebar2',
          label: 'MiniProgram',
          value: 'mini-program',
          // href: '/docs/mini-program/components/start/quick-start',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sidebar1',
          label: 'React',
          value: 'react',
          // href: '/docs/react/components/start/quick-start',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sidebar3',
          label: 'Vue',
          value: 'vue',
          // href: '/docs/vue/components/start/quick-start',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sidebar4',
          label: 'WebComponents',
          value: 'web-components',
          // href: '/docs/web-components/components/start/quick-start',
        },
      ],
    },

    {
      to: 'docs/design/global-style/color',
      label: '设计',
      position: 'right',
    },

    {
      href: 'https://www.figma.com/community/file/1194917512409387064',
      html: '资源',
      position: 'right',
    },
    // {
    //   to: 'docs/tools',
    //   label: '工具',
    //   position: 'right'
    // },
    {
      href: 'https://github.com/weimob-tech/titian-design',
      html: `
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99375 1.19214C4.12969 1.19058 1 4.3187 1 8.17964C1 11.2328 2.95781 13.8281 5.68437 14.7812C6.05156 14.8734 5.99531 14.6125 5.99531 14.4343V13.2234C3.875 13.4718 3.78906 12.0687 3.64687 11.8343C3.35937 11.3437 2.67969 11.2187 2.88281 10.9843C3.36562 10.7359 3.85781 11.0468 4.42812 11.889C4.84062 12.5 5.64531 12.3968 6.05312 12.2953C6.14219 11.9281 6.33281 11.6 6.59531 11.3453C4.39844 10.9515 3.48281 9.61089 3.48281 8.01714C3.48281 7.2437 3.7375 6.53276 4.2375 5.95933C3.91875 5.01401 4.26719 4.20464 4.31406 4.08433C5.22188 4.00308 6.16562 4.73433 6.23906 4.79214C6.75469 4.65308 7.34375 4.57964 8.00313 4.57964C8.66563 4.57964 9.25625 4.6562 9.77656 4.79683C9.95313 4.66245 10.8281 4.03433 11.6719 4.11089C11.7172 4.2312 12.0578 5.02183 11.7578 5.95464C12.2641 6.52964 12.5219 7.24683 12.5219 8.02183C12.5219 9.6187 11.6 10.9609 9.39688 11.3484C9.76406 11.7109 9.99219 12.214 9.99219 12.7703V14.5281C10.0047 14.6687 9.99219 14.8078 10.2266 14.8078C12.9938 13.875 14.9859 11.2609 14.9859 8.1812C14.9859 4.3187 11.8547 1.19214 7.99375 1.19214V1.19214Z" fill="#212121"/>
            </svg>
                `,
      position: 'right',
      target: '_blank',
    },
  ],
};

module.exports = navbar;
