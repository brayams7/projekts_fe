
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
// import LexicalEditorRefPlugin from "@lexical/react/LexicalOn";

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
import { useCallback, useEffect} from 'react';
// import { useParams } from 'react-router-dom';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import {

//   COMMAND_PRIORITY_LOW,
//   BLUR_COMMAND,
//   FOCUS_COMMAND
// } from "lexical";
// import { $getRoot } from 'lexical';


const MyCustomPluginInitStage = ({featureId, content, currentId})=>{
  // const {boardId} = useParams()
  // const currentId = useRef(null)

  const [editor] = useLexicalComposerContext();
  // const [isFirstRender, setIsFirstRender] = useState(true)

  const handleInitStage = useCallback(async()=>{

      // const featureIdCurrent = localStorage.getItem("idFeatureCurrent")
      const initStage = JSON.parse(localStorage.getItem('initStage'))

      if(content){

        if(currentId === featureId) return

        const editorState = editor.parseEditorState(content);
        editor.setEditorState(editorState);
        // localStorage.setItem("editorStage", "")
      }else{
        const editorState = editor.parseEditorState(initStage);
        editor.setEditorState(editorState);
      }
      // currentId.current = featureId
      // console.log(editor)

  },[editor, content, currentId, featureId])


  useEffect(()=>{
    // if(isFirstRender){
      // console.log("is first resnder")
      // setIsFirstRender(false)
      // if(currentId.current !== featureId)
        handleInitStage()
      // console.log({currentId:currentId.current})
    // }
    // console.log(isFirstRender, featureId)
  },[featureId, handleInitStage])

  // console.log(isFirstRender)
  // useEffect(()=>{

  //   return ()=>{
  //     console.log("entro")
  //     setIsFirstRender(true)
  //   }
  // },[])


  return null
}

// const MyCustomPluginFocus = ()=>{
//   const [editor] = useLexicalComposerContext()
//   // Possibly use useRef for synchronous updates but no re-rendering effect
//   const [hasFocus, setFocus] = useState(false)


//   useEffect(
//     () =>
//       editor.registerCommand(
//         BLUR_COMMAND,
//         () => {
//           setFocus(false)
//           return false
//         },
//         COMMAND_PRIORITY_LOW
//       ),
//     [editor]
//   )

//   useEffect(
//     () =>
//       editor.registerCommand(
//         FOCUS_COMMAND,
//         () => {
//           setFocus(true)
//           return false
//         },
//         COMMAND_PRIORITY_LOW
//       ),
//     [editor]
//   )


//   useEffect(()=>{
//     if(!hasFocus){
//       console.log("hola")
//     }
//   },[hasFocus])

//   // console.log(hasFocus)

//   return null
// }


const Wysiwyg = ({featureId, editorState, handleUpdateFeature, currentId}) => {
  // const editorStateRef = useRef();
  // console.log({feature, editorState})
  // const focus = useEditorFocus()

  const handleChangeContent = (editorState)=>{
    editorState.read(() => {
      const stringifiedEditorState = JSON.stringify(editorState.toJSON());
      // setEditorState(stringifiedEditorState);
      // editorState.current = stringifiedEditorState
      handleUpdateFeature("", stringifiedEditorState)
      // console.log(stringifiedEditorState)
      localStorage.setItem("editorStage", stringifiedEditorState)
   });
  }

  // console.log(editorState)
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
          {
            <MyCustomPluginInitStage
              featureId={featureId}
              content={editorState}
              currentId={currentId}
            />
          }
          {/* <TreeViewPlugin /> */}

          <ImagesPlugin captionsEnabled={false}/>
          <ListPlugin />
          <LinkPlugin />
          {/* <MyCustomPluginFocus/> */}
          {/* <LexicalEditorRefPlugin editorRef={editorRef}/> */}
        </div>

      </div>
    </LexicalComposer>
  );
};

export default Wysiwyg;
