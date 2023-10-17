import { useEffect, useRef, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";

import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
} from "lexical";

import { CAN_USE_DOM } from "../../../../utilsFunctions/canUseDOM";


import {
  $createImageNode,
  $isImageNode,
  ImageNode
} from "../../cutomNodes/imageNode";

import './imagePlugin.css'

const getDOMSelection = (targetWindow) =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

// eslint-disable-next-line react-refresh/only-export-components
export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUriDialogBody({onClick}){
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  return (
    <>
      <div className="w-100">
        <input
          type="text"
          placeholder="i.e. https://source.unsplash.com/random"
          onChange={(e) => setSrc(e.target.value)}
          value={src}
        />
      </div>

      <div className="w-100">
        <input
          type="text"
          placeholder="Imagen aleatoria sin mostart"
          onChange={(e) => setAltText(e.target.value)}
          value={altText}
          // variant="standard"
          data-test-id="image-modal-alt-text-input"
        />
      </div>

      <div className="d-flex flex-row-reverse">
        <button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src })}
          // variant="outlined"
        >
          Confirm
        </button>
      </div>
    </>
  )

}


export function InsertImageUploadedDialogBody({ onClick }){
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  const loadImage = (files) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === "string") {
        setSrc(reader.result);
      }
      return "";
    }

    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  }

  return (
    <>
      <div className="d-flex flex-column image-plugin-uploadimage-container gap-3">
        <label htmlFor="upload-img" className="d-block uploadimage-button text-center">
          Subir archivo
        </label>
        <input
          id="upload-img"
          onChange={(e) => loadImage(e.target.files)}
          hidden
          accept="image/*"
          multiple
          type="file"
        />
        {/* <button  type="button">
          Subir archivo

        </button> */}


      <div className="w-100 mb-2">
        <input
          type="text"
          className="form-control w-100"
          placeholder="Texto alternativo descriptivo"
          onChange={(e) => setAltText(e.target.value)}
          value={altText}
          // variant="standard"
          data-test-id="image-modal-alt-text-input"
        />
      </div>

      <div className="d-flex flex-row-reverse">
        <button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          className="confirm-uploadimage-button px-3 py-2"
          onClick={() => onClick({ altText, src })}
          // variant="outlined"
        >
          Confirmar
        </button>
      </div>
      </div>
    </>
  )

}


export function InsertImageDialog({activeEditor, onClose}){
  const [mode, setMode] = useState(null);
  const hasModifier = useRef(false);

  useEffect(() => {
    hasModifier.current = false;
    const handler = (e) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);

  const onClick = (payload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };

  return (
    <>
      {
        !mode && (
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              data-test-id="image-modal-option-url"
              onClick={() => setMode("url")}
              style={{width:100}}
            >
              URL
            </button>

            <button
              className="btn btn-secondary"
              data-test-id="image-modal-option-file"
              onClick={() => setMode("file")}
              style={{width:100}}

            >
              File
            </button>
          </div>
        )
      }

      {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
      {mode === "file" && <InsertImageUploadedDialogBody onClick={onClick} />}
    </>
  )
}

export default function ImagesPlugin({ captionsEnabled }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [captionsEnabled, editor]);

  return null;
}

const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const img = document.createElement("img");
img.src = TRANSPARENT_IMAGE;

function onDragStart(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData("text/plain", "_");
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: "image",
    })
  );

  return true;
}

function onDragover(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}

function onDrop(event, editor) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}

function getImageNodeInSelection() {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

function getDragImageData(event) {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag");
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== "image") {
    return null;
  }

  return data;
}

function canDropImage(event) {
  const target = event.target;
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.editor-image") &&
    target.parentElement &&
    target.parentElement.closest("div.ContentEditable__root")
  );
}

function getDragSelection(event) {
  let range;
  const target = event.target;
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
      ? target.defaultView
      : target.ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }

  return range;
}
