import autoBindReact from 'auto-bind/react';
import React, { DragEvent } from 'react';
import PDFSelector from '../PDFSelector';
import Selector from './Selector_UI';
import './SelectorBar.css'

export interface ISelectorFunctionProps {
    // Functions that will be passed to each Selector componenet
    onSelectorRemove: (sel: PDFSelector) => void;
    onSelectorChange: (sel: PDFSelector, newPageSelection:string) => void;
}


interface ISelectorBarProps extends ISelectorFunctionProps{
    isFileDragged:boolean;
    selectors: PDFSelector[];
    onSelectorAdd: (fileName: string) => void;
    onSelectorMove: (sel: PDFSelector, newIndex: number) => void;
}

interface ISelectorBarState {
}

export default class SelectorBar extends React.Component<ISelectorBarProps, ISelectorBarState> {
    // This component is responsible for rendering selectors and managing them

    constructor(props: ISelectorBarProps) {
        super(props);
        autoBindReact(this);
    }

    handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const fileName: string = e.dataTransfer.getData('pdf/name');
        // checks if the text droped is name of a pdf
        if (fileName) {
            this.props.onSelectorAdd(fileName);
        }
    }

    render() {
        let content;
        if (this.props.isFileDragged) {
            content = (
                <div
                    className="selector-bar"
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleDrop}
                >

                </div>
            )
        } else {
            content = (
                <div
                    className="container my-3"
                >
                    {this.props.selectors.map((sel) => {
                        return (
                            <div
                                key={`key_${sel.id}`}
                                className="row justify-content-center mt-2"
                            >
                                <Selector
                                    sel={sel}
                                    onSelectorChange={this.props.onSelectorChange}
                                    onSelectorRemove={this.props.onSelectorRemove}
                                />
                            </div>
                        );
                    })}

                </div>
            )
        }

        return content;
    }
}