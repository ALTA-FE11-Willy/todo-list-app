import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const Input: FC<Props> = ({ label, id, ...props }) => {
  return (
    <div className="mb-3 text-center">
      <label className="text-3xl font-bold  ">{label}</label>
      <input id={id} className="input input-bordered w-full mt-3" {...props} />
    </div>
  );
};

export const TextArea: FC<Props> = ({ label, id, ...props }) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input id={id} className="input input-bordered w-full" {...props} />
    </div>
  );
};
