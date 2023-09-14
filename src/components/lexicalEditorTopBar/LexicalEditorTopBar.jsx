
// import { createPortal } from 'react-dom';
import './style.css'
import pluginsList from './topBarIconsList';
import useOnClickListener from './useOnClickListener';
import FloatingLinkEditor from './floatingLinkEditor/FloatingLinkEditor';
import { createPortal } from 'react-dom';

const LexicalEditorTopBar = () => {
  const {
    onClick, selectedEventTypes, blockType, isLink, editor, modal
  } = useOnClickListener()

  const isIconSelected = (plugin) => selectedEventTypes.includes(plugin.event) || blockType.includes(plugin.event);

  return (
    <div className="mb-2 w-100 px-2 py-1 editor-topbar d-flex flex-wrap gap-3 justify-content-center">
      {
        pluginsList.map((item)=>(
          <span
            key={item.id}
            style={{cursor:"pointer"}}
            onClick={()=>onClick(item.event)}
            className={
              isIconSelected(item) ? "bg-secondary-subtle" : ""
            }
          >
            {
              <item.Icon
                fill='var(--purple)'
              />
            }
          </span>
        ))
      }
      {isLink &&
        // <FloatingLinkEditor editor={editor} />
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)
      }
      {modal}
    </div>
  );
};

export default LexicalEditorTopBar;
