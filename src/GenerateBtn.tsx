import React from 'react';

type GenerateBtnProps = {
    onClick: () => void;
}



export default class GenerateBtn extends React.Component<GenerateBtnProps> {
    render() {
        return (
            <button onClick={this.props.onClick} type="button" className="btn btn-primary">Generate PDF</button>
        );
    }
}