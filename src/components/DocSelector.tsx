import DocSelectorData from "../DocSelectorData";

export default function DocSelector(props: {
    dSel: DocSelectorData
}) {
    return (
        <div>
            {props.dSel.document.name} - {props.dSel.document.size} bytes
        </div>
    );
}