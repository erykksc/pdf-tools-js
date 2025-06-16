import { useEffect } from "react";
import {
	MdContentCopy,
	MdDeleteOutline,
	MdOutlineDragIndicator,
} from "react-icons/md";
import DocSelectorData from "../DocSelectorData";
import {
	addDocSelector,
	removeDocSelector,
	updateDocSelector,
} from "../redux/docSlice";
import { useAppDispatch } from "../redux/store";
import { useTranslation } from "react-i18next";

export default function DocSelector(props: {
	data: DocSelectorData;
	onStartPageChange: (new_value?: number) => void;
	onEndPageChange: (new_value?: number) => void;
}) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const { filename, startPage, endPage, pageCount, errorMsg } = props.data;
	const { onStartPageChange, onEndPageChange } = props;

	useEffect(() => {
		let newErrorMsg: string | undefined = undefined;
		// start page validation, if defined
		if (startPage !== undefined) {
			if (startPage < 1)
				newErrorMsg = "Start page must be greater than 0";
			else if (startPage > pageCount)
				newErrorMsg = "Start page can't be greater than page count";
			else if (endPage && startPage > endPage)
				newErrorMsg = "Start page can't be greater than end page";
		}
		// end page validation, if defined
		if (endPage !== undefined) {
			if (endPage < 1) newErrorMsg = "End page must be greater than 0";
			else if (endPage > pageCount)
				newErrorMsg = "End page can't be greater than page count";
		}

		// If error message changed, update it
		if (newErrorMsg !== errorMsg)
			dispatch(
				updateDocSelector({ ...props.data, errorMsg: newErrorMsg }),
			);
	}, [
		dispatch,
		filename,
		startPage,
		endPage,
		pageCount,
		errorMsg,
		props.data,
	]);

	const handleStartPageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newValue = event.target.valueAsNumber;
		if (isNaN(newValue)) {
			if (errorMsg)
				dispatch(updateDocSelector({ ...props.data, errorMsg: "" }));
			return onStartPageChange(undefined);
		}

		onStartPageChange(newValue);
	};

	const handleEndPageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const newValue = event.target.valueAsNumber;
		if (isNaN(newValue)) {
			if (errorMsg)
				dispatch(updateDocSelector({ ...props.data, errorMsg: "" }));
			return onEndPageChange(undefined);
		}

		onEndPageChange(newValue);
	};

	const handleOnCopyClick = () => {
		// copy props data to new object
		dispatch(addDocSelector({ ...props.data, id: undefined }));
	};

	return (
		<>
			<div
				className={`
					text-black
					dark:text-white
					cursor-move
					grab
					flex
					items-center
					space-x-4
					rounded
					px-3
					py-2
					${
						errorMsg === undefined
							? "bg-gray-100 dark:bg-gray-600"
							: "bg-red-300 dark:bg-red-400"
					}
					`}
			>
				<div title={t("Drag to reorder")}>
					<MdOutlineDragIndicator size={20} />
				</div>
				<span className="grow w-full justify-center whitespace-normal break-all text-center">
					{filename}
				</span>
				<div className="flex flex-col">
					<label
						htmlFor="startPage"
						className="block font-medium text-gray-700 dark:text-white text-xs"
					>
						{t("Start page")}:
					</label>
					<input
						type="number"
						name="startPage"
						placeholder="1"
						min={1}
						value={startPage ?? ""}
						onChange={handleStartPageChange}
						className="text-center dark:text-black w-20 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="endPage"
						className="block font-medium text-gray-700 dark:text-white text-xs"
					>
						{t("End page")}:
					</label>
					<input
						type="number"
						name="endPage"
						placeholder={pageCount.toString()}
						min={1}
						value={endPage ?? ""}
						onChange={handleEndPageChange}
						className="text-center dark:text-black w-20 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
					/>
				</div>
				<button
					className="p-2 rounded"
					onClick={handleOnCopyClick}
					title={t("Copy selector")}
				>
					<MdContentCopy size={20} />
				</button>
				<button
					className={
						`p-2 text-red-500 ` +
						(errorMsg !== undefined ? "dark:text-black" : "")
					}
					onClick={() => dispatch(removeDocSelector(props.data))}
					title={t("Remove selector")}
				>
					<MdDeleteOutline size={25} />
				</button>
			</div>
			<span className="flex justify-center text-sm">{errorMsg}</span>
		</>
	);
}
