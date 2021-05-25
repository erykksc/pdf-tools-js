import React, { ChangeEvent } from 'react';
import PDFSelector from '../PDFSelector'
import './Selector_UI.css'
import autoBindReact from 'auto-bind/react';
import { ISelectorFunctionProps } from './SelectorBar'


export interface ISelectorProps extends ISelectorFunctionProps {
    sel: PDFSelector;
}

interface ISelectorState {
    mouseOver: boolean;
}

export default class Selector extends React.Component<ISelectorProps, ISelectorState> {
    constructor(props: ISelectorProps) {
        super(props);
        this.state = { mouseOver: false };
        autoBindReact(this);
    }
    componentDidMount() {
        setTimeout(this.checkIfPageCountLoaded, 0);
    }

    handlePageSelectionChange(e: ChangeEvent<HTMLInputElement>) {
        this.props.onSelectorChange(this.props.sel, e.target.value);
    }

    handleSelectorRemove() {
        this.props.onSelectorRemove(this.props.sel);
    }

    checkIfPageCountLoaded() {
        // Checks if page count has loaded in order to update the placeholder property in input filed
        if (this.props.sel.pageCount !== 0) {
            this.setState({});
        }
        else {
            setTimeout(this.checkIfPageCountLoaded, 50);
        }
    }

    handleMouseEnter() {
        this.setState({ mouseOver: true });
    }

    handleMouseLeave() {
        this.setState({ mouseOver: false })
    }

    render() {
        return (
            <div className="selector d-flex align-items-center" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <label htmlFor="startPage">{this.props.sel.file.name}</label>
                <div className="form-group form-check-inline">
                    <input
                        type="text"
                        onChange={this.handlePageSelectionChange}
                        id="page-selection"
                        value={this.props.sel.inputStr}
                        placeholder={this.props.sel.pageCount !== 0 ? `1:${this.props.sel.pageCount}` : 'loading'}
                        className={`form-control ${this.props.sel.isValid === false && "is-invalid"}`}
                    />
                    {this.state.mouseOver && <button onClick={this.handleSelectorRemove} type="button" className="btn-danger">X</button>}
                    <div className="invalid-feedback">
                        {this.props.sel.errorMsg}
                    </div>
                </div>
            </div>
        );
    }
}