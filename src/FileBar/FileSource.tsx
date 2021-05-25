import autoBindReact from 'auto-bind/react';
import React, { DragEvent } from 'react';

interface IFileSourceProps {
    file: File;
    onFileRemove: (f: File) => void;
}

interface IFileSourceState {
    mouseOver: boolean;
}

export default class FileSource extends React.Component<IFileSourceProps, IFileSourceState> {
    constructor(props: IFileSourceProps) {
        super(props);
        autoBindReact(this);
        this.state = { mouseOver: false };
    }

    handleRemoveFile() {
        this.props.onFileRemove(this.props.file);
    }

    handleMouseEnter() {
        this.setState({ mouseOver: true });
    }

    handleOnMouseLeave() {
        this.setState({ mouseOver: false });
    }

    handleOnDragStart(e: DragEvent<HTMLDivElement>) {
        e.dataTransfer?.setData('pdf/name', this.props.file.name);
    }

    render() {
        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleOnMouseLeave}
                onDragStart={this.handleOnDragStart}
                draggable="true"
                className="file-block d-flex align-content-center justify-content-center"
            >
                {this.state.mouseOver && <button onClick={this.handleRemoveFile} type="button" className="top-right remove-btn btn btn-danger">X</button>}
                <div
                    style={this.state.mouseOver ? { opacity: 0.2 } : { opacity: 1 }}
                >
                    <p className="file-source-content">{this.props.file.name}</p>
                </div>
            </div>
        );
    }
}