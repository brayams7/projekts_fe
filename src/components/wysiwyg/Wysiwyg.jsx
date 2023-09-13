
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
// import { MyCustomAutoFocusPlugin } from './plugins/AutoFocusPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";


// import OnChangePlugin from './plugins/OnChangePlugin';
import './wysiwyg.css'
import theme from './themes';
import LexicalEditorTopBar from '../lexicalEditorTopBar/LexicalEditorTopBar';

const editorConfig = {
  namespace: 'MyEditor',
  // The editor theme
  theme: theme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
}

const Wysiwyg = () => {

  // const [editorState, setEditorState] = useState();

  // const initialConfig = {
  //   namespace: 'MyEditor',
  //   theme,
  //   onError,
  // };

  const handleChangeContent = (editorStage)=>{
    // setEditorState(editorStage)
    // console.log(editorStage)
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <LexicalEditorTopBar/>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="content-editable" />}
          placeholder={
            <div className="editor-placeholder">Enter some text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={handleChangeContent}/>

        {/* <TreeViewPlugin /> */}
        <ListPlugin />
        <LinkPlugin />

      </div>
    </LexicalComposer>
  );
};

export default Wysiwyg;
