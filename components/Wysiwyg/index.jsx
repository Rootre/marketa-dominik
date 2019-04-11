import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ContentState, EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';

import Input from '../Input';

import './globals.scss';
import styles from './styles.scss';

function Wysiwyg({autofocus = false, formattedValue = '', label, name, value=''}, ref) {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(formattedValue
        ? convertFromRaw(JSON.parse(formattedValue))
        : ContentState.createFromText(value)
    ));

    function onEditorStateChange(state) {
        setEditorState(state);
    }

    useImperativeHandle(ref, () => ({
        isEmpty: () => convertToRaw(editorState.getCurrentContent()).blocks.map(({text}) => text).join('').trim() === '',
        reset: () => setEditorState(EditorState.createEmpty()),
        value: () => JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    }));

    return (
        <div className={styles.wrapper}>
            <Input type={'hidden'} name={name} value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}/>
            {label && <label>{label}</label>}
            <Editor
                editorRef={ref => autofocus && ref && ref.focus()}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

export default forwardRef(Wysiwyg);