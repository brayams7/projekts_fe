
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
// import { MyCustomAutoFocusPlugin } from './plugins/AutoFocusPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'


import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalEditorTopBar from '../lexicalEditorTopBar/LexicalEditorTopBar';
import ImagesPlugin from './plugins/imagePlugin/ImagePlugin';

import './wysiwyg.css'
import { editorConfig } from '../../config/lexicalEditorConfig';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


const MyCustomPluginInitStage = ()=>{
  const {boardId} = useParams()
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true)

  const handleInitStage = useCallback(async()=>{

      const data = JSON.parse(localStorage.getItem("editorStage"))

      if(data){
        const editorState = editor.parseEditorState(data);
        editor.setEditorState(editorState);
      }

  },[editor])


  useEffect(()=>{
    if(isFirstRender){
      setIsFirstRender(false)
      handleInitStage()
    }

  },[boardId, editor, handleInitStage, isFirstRender])


  return null
}


const Wysiwyg = () => {
  const [editorState, setEditorState] = useState();

  const handleChangeContent = (editorState)=>{
    editorState.read(() => {
      const stringifiedEditorState = JSON.stringify(editorState.toJSON());
      setEditorState(stringifiedEditorState);
   });
  }

  const onSubmit = ()=>{
    localStorage.setItem("editorStage", editorState)
  }



  return (
    <LexicalComposer initialConfig={editorConfig}>
      <LexicalEditorTopBar/>
      <div className="editor-container">
        <div className="editor-scroller">
          <RichTextPlugin
            contentEditable={<div className='editor'><ContentEditable className="content-editable" /></div>}
            placeholder={
              <div className="editor-placeholder">Escribe una descripción...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChangeContent}/>
          <HistoryPlugin />
          <AutoFocusPlugin />
          <MyCustomPluginInitStage/>
          {/* <TreeViewPlugin /> */}

          <ImagesPlugin captionsEnabled={false}/>
          <ListPlugin />
          <LinkPlugin />
        </div>

      </div>
      <button type="button" onClick={()=>onSubmit()}>
        Enviar
      </button>
    </LexicalComposer>
  );
};

export default Wysiwyg;
