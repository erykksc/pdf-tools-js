import React from 'react';
import FilePicker from './FilePicker';
import './Files.css'
import FileSource from './FileSource';


interface IFileBarProps {
    pdfs: File[];
    onFileRemove: (pdf: File) => void;
    onFileAdd: (pdf: File) => void;
}

interface IFileBarState {
}

export default class FileBar extends React.Component<IFileBarProps, IFileBarState> {
    render() {
        return (
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    {this.props.pdfs.map((pdf) => {
                        return (
                            <div key={`key_${pdf.name}`} className="col py-2 d-flex justify-content-center">
                                <FileSource
                                    file={pdf}
                                    onFileRemove={this.props.onFileRemove}
                                />
                            </div>
                        )
                    })}
                    <div className="col py-2 d-flex justify-content-center">
                        <FilePicker onFileAdd={this.props.onFileAdd} />
                    </div>
                </div>
            </div>
        );
    }
}