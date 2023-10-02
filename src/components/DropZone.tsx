import { useDropzone } from 'react-dropzone';
import { addDocSelector } from '../redux/docSlice';
import { useAppDispatch } from '../redux/store';
import { getPDFPageCount } from '../utils';


function DropZone() {
    const dispatch = useAppDispatch();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        onDropAccepted: async (new_files) => {
            const pageCount = await getPDFPageCount(new_files[0]);
            const payload = {
                document: new_files[0],
                pageCount,
                from: pageCount > 0 ? 1 : 0,
                to: pageCount
            }
            dispatch(addDocSelector(payload));
        },
    });


    // const files = acceptedFiles.map(file => (
    //     <li key={file.name}>
    //         {file.name} - {file.size} bytes
    //     </li>
    // ));

    return (
        <section className="container mx-auto px-4">
            <div
                {...getRootProps({
                    className: 'border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100',
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