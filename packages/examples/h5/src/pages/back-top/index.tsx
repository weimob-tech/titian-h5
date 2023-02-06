const BackTopPage: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ti-back-top
        onClick={() => {
          console.log('click');
        }}
      />
      <ti-cell-group>
        {Array(100)
          .fill(1)
          .map((_i, idx) => (
            <ti-cell key={idx} title="向下滑动页面" />
          ))}
      </ti-cell-group>
    </>
  );
};

export default BackTopPage;
