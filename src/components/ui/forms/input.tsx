import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // Define the props for your component here
}

// TODO: React19 - React.forwardRef
export const Input = React.forwardRef((props: Props, ref: any) => {
  return (
    <input
      className="bg-black text-white font-semibold p-2 pl-5 text-lg block w-full px-0.5 border-2 rounded-3xl border-primary focus:ring-0 focus:border-primary outline-none"
      {...props}
    />
  );
});

type FormInputProps = {
  children: React.ReactNode;
  label: string;
};

export const FormInput = ({ children, label }: FormInputProps) => (
  <div>
    <div className="text-sm text-gray-400">
      <label>{label}</label>
    </div>
    {children}
  </div>
);

export default FormInput;
