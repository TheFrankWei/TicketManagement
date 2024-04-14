import { forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";

interface InputProps
  extends React.PropsWithRef<JSX.IntrinsicElements["input"]> {
  id: string;
  label?: string;
  error?: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label = id, error, ...rest }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input id={id} ref={ref} {...rest} className="border border-black" />
      {error && (
        <ErrorMessage
          errors={error}
          name={id}
          render={({ message }) => <p className="error">{message}</p>}
        />
      )}
    </div>
  )
);

Input.displayName = "Input";

export default Input;
