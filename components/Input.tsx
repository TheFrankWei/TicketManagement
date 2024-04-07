import { forwardRef } from "react";

interface InputProps
  extends React.PropsWithRef<JSX.IntrinsicElements["input"]> {
  id: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label = id, ...rest }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input id={id} ref={ref} {...rest} className="border border-black"/>
    </div>
  )
);

Input.displayName = "Input";

export default Input;
