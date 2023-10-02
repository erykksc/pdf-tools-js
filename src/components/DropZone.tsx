import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DocSelectorData from '../DocSelectorData';
import { addDocSelector } from '../redux/docSlice';
import { useAppDispatch } from '../redux/store';
import LoadingOverlay from './LoadingOverlay';


function DropZone() {
    const dispatch = useAppDispatch();
    const [isLoadingDoc, setIsLoadingDoc] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        onDropAccepted: async (new_files) => {
            setIsLoadingDoc(true);
            const document = await PDFDocument.load(await new_files[0].arrayBuffer());
            const pageCount = document.getPageCount()
            const payload: DocSelectorData = {
                document,
                filename: new_files[0].name,
                pageCount,
                startPage: 1,
                endPage: pageCount
            }
            setIsLoadingDoc(false);
            dispatch(addDocSelector(payload));
        },
    });

    return (
        <section className="container mx-auto px-4 drag h-60">
            {isLoadingDoc && <LoadingOverlay />}

            <div
                {...getRootProps({
                    className: 'border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100 h-full',
                })}
            >
                <input {...getInputProps()} />
                <p className="text-lg font-medium mb-2">Drag 'n' drop files here, or click to select files</p>
                <p className="text-gray-500">Only PDF files are allowed</p>
            </div>
        </section>
    );
}

export default DropZone;