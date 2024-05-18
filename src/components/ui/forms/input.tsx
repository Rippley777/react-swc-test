import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // Define the props for your component here
}

// TODO: React19 - React.forwardRef
export const Input = React.forwardRef((props: Props, ref: any) => {
  return (
    <input
      className="bg-transparent text-2xl block w-full px-0.5 border-0 border-b-2 border-black focus:ring-0 focus:border-yellow-400 outline-none"
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
