const mockSkuData = {
  specs: [
    {
      label: '套餐',
      specId: '2',
      options: [
        { optionId: '3', label: '套餐一' },
        { optionId: '4', label: '套餐二' },
        { optionId: '30', label: '套餐三' },
        { optionId: '40', label: '套餐四' },
        { optionId: '50', label: '套餐五' },
        { optionId: '60', label: '套餐六' },
      ],
    },
    {
      label: '颜色',
      specId: '1',
      options: [
        { optionId: '1', label: '红色' },
        { optionId: '2', label: '紫色' },
      ],
    },

    {
      label: '内存',
      specId: '3',
      options: [
        { optionId: '5', label: '64G' },
        { optionId: '6', label: '128G' },
        { optionId: '7', label: '256G' },
      ],
    },
  ],
  skus: [
    {
      skuId: '1',
      specOptionDesc: ['紫色', '套餐一', '64G'],
      specOptionIds: ['2', '3', '5'],
      price: 123.12,
      priceLabel: '价格',
      subPrice: 99.99,
      subPriceLabel: '会员价',
      initCount: 2,
      stock: 10,
      title: '1测试商品测试商品测试商品测试商品测试商品测试商品',
      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '2',
      specOptionDesc: ['紫色', '套餐一', '128G'],
      specOptionIds: ['2', '3', '6'],
      price: 3456.11,
      priceLabel: '价格',
      subPrice: 3000,
      stock: 11,
      initCount: 3,
      title: '2测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '3',
      specOptionDesc: ['紫色', '套餐二', '128G'],
      specOptionIds: ['2', '4', '6'],
      price: 12.0,
      priceLabel: '价格',
      subPrice: 9.99,
      subPriceLabel: '会员价',
      initCount: 4,
      stock: 12,
      title: '3测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '4',
      specOptionDesc: ['红色', '套餐二', '256G'],
      specOptionIds: ['1', '4', '7'],
      price: 1.56,
      priceLabel: '价格',
      subPrice: 1,
      subPriceLabel: '会员价',
      initCount: 5,
      stock: 13,
      title: '4测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '5',
      specOptionDesc: ['红色', '套餐二', '128G'],
      specOptionIds: ['1', '4', '6'],
      price: 14,
      priceLabel: '价格',
      stock: 14,
      initCount: 6,
      title: '5测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
  ],
  value: '1',
  defaultDispayInfo: {
    skuId: '4',
    specOptionDesc: ['红色', '套餐二', '256G'],
    specOptionIds: ['1', '4', '7'],
    price: 10,
    priceLabel: '价格',
    pricePrefix: '',
    pricePostfix: '起',
    hasSubPrice: true,
    subPrice: 0,
    subPriceLabel: '会员价',
    subPricePrefix: '',
    subPricePostfix: '起',
    stock: 80,
    title: '6测试商品测试商品测试商品测试商品测试商品测试商品',

    imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
  },
};

const mockSkuDataSingle = {
  specs: [],
  value: '101428292999837',
  skus: [
    {
      itemId: 491937794015404,
      goodsId: '100472837999837',
      skuId: '101428292999837',
      stock: 7,
      imageUrl: 'https://image-c-dev.weimobwmc.com/qa-saas-wxbiz/e4783b5fabf84f6292d14baac8817291.jpeg',
      specOptionDesc: [],
      specOptionIds: [],
      initCount: 2,
      price: 1,
      priceLabel: '团购价',
    },
  ],
  defaultDispayInfo: {
    skuId: '101428292999837',
    specOptionDesc: [],
    specOptionIds: [],
    price: 1,
    priceLabel: '价格',
    pricePrefix: '价格',
    pricePostfix: '',
    hasSubPrice: false,
    subPrice: null,
    subPriceLabel: '',
    subPricePrefix: '',
    subPricePostfix: '起',
    stock: 7,
    imageUrl: 'https://image-c-dev.weimobwmc.com/qa-saas-wxbiz/e4783b5fabf84f6292d14baac8817291.jpeg',
  },
};

export default mockSkuData;

export { mockSkuData, mockSkuDataSingle };
