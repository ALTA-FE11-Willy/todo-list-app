import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const Button: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      className="btn w-full md:w-36 tracking-wider bg-[#678983] text-[#fff]"
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
