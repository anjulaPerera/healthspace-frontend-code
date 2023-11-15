import React, { ReactElement } from "react";

interface TextInputProps {

    text?: string | undefined;
    onTextChange: (text: string) => void;
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    units?: string;
    value?: string;
    min?: number;
    max?: number;
}

export function TextInputInline(props: TextInputProps): ReactElement {

    return (
        <div className="htmlForm-group pb-8 w-100" style={{ display: "inline-block" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>

                <label htmlFor={props.id} className="text-black-2 font-size-4 font-weight-semibold  mb-0 w40 pr-6 arrow-3 h-px-48"
                    style={{ float: "left", lineHeight: "48px", flexGrow: 2 }}>{props.label}</label>
                <div style={{ float: "right", flexGrow: 1 }}>
                    <input name="textarea" id={props.id}
                        width="10px"
                        min={props.min}
                        max={props.max}
                        type={props.type}
                        className="border border-mercury text-gray pt-4 pl-6 pb-4"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={e => props.onTextChange(e.target.value)} />
                </div>
                <span className="text-black-2 font-size-3 font-weight-semibold  mb-0 w40 pr-6 arrow-3 h-px-48"
                    style={{ float: "left", lineHeight: "48px", flexGrow: 2 }}>{props.units}</span>
            </div>
        </div>
    );
}
