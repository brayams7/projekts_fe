import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { editorCommentConfig } from "../../../../config/lexicalEditorConfig";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import OnChangePlugin from "../../../wysiwyg/plugins/OnChangePlugin";
import { $getRoot } from "lexical";

const Comment = ({setCommentState,handleSubmit}) => {

  const handleChangeContent = (editorState, editor)=>{
    editorState.read(() => {
      const stringifiedEditorState = JSON.stringify(editorState.toJSON());
      const c = editor.parseEditorState(stringifiedEditorState)
      const editorStateTextString = c.read(() => $getRoot().getTextContent())
      setCommentState(editorStateTextString)
      // console.log(stringifiedEditorState)
      // localStorage.setItem("editorStage", stringifiedEditorState)
   })
  }

  // const handleSubmit = () =>{

  // }

  return (
    <LexicalComposer initialConfig={editorCommentConfig}>
      <div className="editor-container-comment">
        <RichTextPlugin
            contentEditable={<div className='content-editable-comment-wrapper'><ContentEditable className="content-editable-comment" /></div>}
            placeholder={
              <div className="editor-placeholder">Escribe una descripción...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          {/* <OnChangePlugin onChange={handleChangeContent}/> */}
          <OnChangePlugin onChange={handleChangeContent}/>
          <HistoryPlugin />
          <AutoFocusPlugin />
      </div>

      <div className="d-flex justify-content-end editor-topbar-comment p-3">
        <button
          className="bgPurple-color px-2 py-1 white-color rounded"
          onClick={handleSubmit}
        >
          COMENTARIO
        </button>

      </div>
    </LexicalComposer>
  );
};

export default Comment;
