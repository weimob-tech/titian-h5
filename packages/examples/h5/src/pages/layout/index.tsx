import './index.css';

const Layout: React.FC<Record<string, never>> = () => {
  return (
    <div>
      <ti-row gutter={16}>
        <ti-col span={24}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={12}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={12}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={6}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={6}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={6}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={6}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={3}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={3}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={3} offset={6}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={6}>
          <div className="item">1</div>
        </ti-col>
        <ti-col span={3}>
          <div className="item">1</div>
        </ti-col>
      </ti-row>
    </div>
  );
};

export default Layout;
