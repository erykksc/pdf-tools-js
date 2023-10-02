import { ButtonHTMLAttributes } from 'react';

interface IMyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

function DangerButton(props: IMyButtonProps) {
    return (
        <button {...props} className="bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white font-bold py-2 px-4 rounded" />
    );
}

export default DangerButton;