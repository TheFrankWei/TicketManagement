import { ErrorMessage } from "@hookform/error-message";
import { forwardRef } from "react";

interface TextAreaProps
  extends React.PropsWithRef<JSX.IntrinsicElements["textarea"]> {
  id: string;
  label?: string;
  error?: any;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label = id, error, ...rest }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        className="bg-white p-2 border border-black"
        id={id}
        ref={ref}
        {...rest}
      />
      {error && (
        <ErrorMessage
          errors={error}
          name="email"
          render={({ message }) => <p className="error">{message}</p>}
        />
      )}
    </div>
  )
);

TextArea.displayName = "TextArea";

export default TextArea;
