import { forwardRef } from "react";

interface TextAreaProps
  extends React.PropsWithRef<JSX.IntrinsicElements["textarea"]> {
  id: string;
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label = id, ...rest }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>
        {label}
      </label>
      <textarea className="bg-white p-2 border border-black" id={id} ref={ref} {...rest} />
    </div>
  )
);

TextArea.displayName = "TextArea";

export default TextArea;
