import { useEffect, useState } from "react";
import DocSelectorData from "../DocSelectorData";

export default function DocSelector(props: {
    data: DocSelectorData,
    onStartPageChange: (new_value: number) => void,
    onEndPageChange: (new_value: number) => void,
}) {
    const [errorMsg, setErrorMsg] = useState<string>('');

    const { document, startPage, endPage, pageCount } = props.data;
    const { onStartPageChange, onEndPageChange } = props;

    useEffect(() => {
        // start page validation
        if (startPage < 1 && startPage !== -1)
            setErrorMsg('Start page must be greater than 0');
        else if (startPage > pageCount)
            setErrorMsg('Start page can\'t be greater than page count');
        else if (startPage > endPage)
            setErrorMsg('Start page can\'t be greater than end page');
        // end page validation
        else if (endPage < 1 && endPage !== -1)
            setErrorMsg('End page must be greater than 0');
        else if (endPage > pageCount)
            setErrorMsg('End page can\'t be greater than page count');
        else
            setErrorMsg('');
    }, [startPage, endPage, pageCount])

    const handleStartPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            setErrorMsg('');
            return onStartPageChange(-1);
        }
        const newValue = Number.parseInt(event.target.value);

        onStartPageChange(newValue);
    }

    const handleEndPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            setErrorMsg('');
            return onEndPageChange(-1);
        }
        const newValue = Number.parseInt(event.target.value);

        onEndPageChange(newValue);
    }

    return (
        <>
            <div className={`flex items-end space-x-4 rounded p-3 ${errorMsg === '' ? 'bg-gray-100' : 'bg-red-300'}`}>
                <span className="grow w-full justify-center whitespace-normal break-all text-center" >{document.name}</span>
                <div className="flex flex-col">
                    <label htmlFor="startPage" className="block font-medium text-gray-700 text-xs">Start page:</label>
                    <input
                        type="number"
                        name="startPage"
                        min={1}
                        value={startPage !== -1 ? startPage : ''}
                        onChange={handleStartPageChange}
                        className="w-20 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="endPage" className="block font-medium text-gray-700 text-xs">End page:</label>
                    <input
                        type="number"
                        name="endPage"
                        min={1}
                        value={endPage !== -1 ? endPage : ''}
                        onChange={handleEndPageChange}
                        className="w-20 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
            </div >
            <span className="flex justify-center text-sm">{errorMsg}</span>
        </>
    );
}