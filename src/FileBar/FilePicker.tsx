import autoBindReact from 'auto-bind/react';
import React, { ChangeEvent } from 'react';


interface IFilePickerProps {
    onFileAdd: (f: File) => void;
}

export default class FilePicker extends React.Component<IFilePickerProps> {
    constructor(props: IFilePickerProps) {
        super(props);
        autoBindReact(this);
    }

    handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            //Guaranteed 1 file in files
            this.props.onFileAdd(e.target.files[0]);
        }
        e.target.value = '';
    }

    render() {
        return (
            <div className="file-block file-picker">
                <label className="pointer-cursor fill-parent d-flex align-items-center justify-content-center">
                    <input onChange={this.handleInputChange} type="file" accept=".pdf" />
                    +
                </label>
            </div>
        );
    }
}