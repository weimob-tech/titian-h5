import { useCallback, useState } from 'react';

const RadioPage: React.FC<Record<string, never>> = () => {
  const [selectValue, setSelectValue] = useState<string | number>(1);
  const [selectDefaultValue] = useState(1);
  const change = useCallback((e: CustomEvent<string | number>) => {
    setSelectValue(e.detail);
  }, []);

  const checkboxChange = useCallback((e: CustomEvent<string | number | boolean>) => {
    console.log(e);
  }, []);

  return (
    <div>
      {/* <ti-radio onChange={checkboxChange}>1</ti-radio>
      <ti-radio onChange={checkboxChange} label="2" />
      <ti-radio onChange={checkboxChange} label={<div>3</div>} />
      <ti-radio onChange={checkboxChange} label="icon" icon="plus" />
      <ti-radio onChange={checkboxChange} label="disabled" disabled />
      <ti-radio onChange={checkboxChange} label="checked" checked />
      <ti-radio onChange={checkboxChange} label="defaultChecked" defaultChecked />
      <ti-radio onChange={checkboxChange} label="labelDisabled" labelDisabled />
      <ti-radio onChange={checkboxChange} label="color" color="blue" />
      <ti-radio onChange={checkboxChange} label="size" size={20} /> */}

      <ti-radio-group>
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="3" value="3" />
      </ti-radio-group>
      <ti-radio-group defaultValue={selectDefaultValue}>
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="defaultValue" value="3" />
      </ti-radio-group>

      <ti-radio-group disabled value="3">
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="disabled" value="3" />
      </ti-radio-group>

      <ti-radio-group onChange={change} value={selectValue}>
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="value" value="3" />
      </ti-radio-group>

      <ti-radio-group color="blue" defaultValue={1}>
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="color" value="3" />
      </ti-radio-group>

      <ti-radio-group defaultValue={1} labelDisabled>
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="labelDisabled" value="3" />
      </ti-radio-group>

      <ti-radio-group defaultValue={1} icon="plus">
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="icon" value="3" />
      </ti-radio-group>

      <ti-radio-group
        options={[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ]}
        defaultValue={2}
      />
      <ti-radio-group defaultValue={1} size={20}>
        <ti-radio label="1" value={1} />
        <ti-radio label="2" value={2} />
        <ti-radio label="size" value="3" />
      </ti-radio-group>
    </div>
  );
};

export default RadioPage;
