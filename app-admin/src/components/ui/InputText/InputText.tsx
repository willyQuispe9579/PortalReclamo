import styles from "./InputText.module.scss";

interface IntInputText {
  onChange?: any;
  onBlur?: any;
  onFocus?: any;
  maxLength?: number;
  max?: number;
  pattern?: string;
  step?: any;
  label: string;
  type: string;
  width: string;
  name: string;
  value: string;
  isValid: "inputText" | "unInputText";
}

const InputText = ({
  type,
  label,
  width,
  maxLength,
  max,
  step,
  pattern,
  onBlur,
  onFocus,
  onChange,
  name,
  isValid,
  value,
}: IntInputText) => {
  return (
    <div className={styles[isValid]} style={{ width }}>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        maxLength={maxLength}
        max={max}
        value={value}
        pattern={pattern}
        step={step}
      />
    </div>
  );
};

export default InputText;
