import { ButtonHTMLAttributes } from 'react';

interface IMyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

function PrimaryButton(props: IMyButtonProps) {
    return (
        <button {...props} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded" />
    );
}

export default PrimaryButton;