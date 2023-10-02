import { ButtonHTMLAttributes } from 'react';

interface IMyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

function MyButton(props: IMyButtonProps) {
    return (
        <button {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
    );
}

export default MyButton;