import { useEffect, useState } from "react";

const TitleDetailFeature = ({handleUpdateFeature, feature}) => {

  const [editModeTitle, setEditModeTitle] = useState(false)
  const [titleFeature, setTitleFeature] = useState("")


  useEffect(()=>{

    if(feature){
      setTitleFeature(feature.title)
      // editorStateRef.current = feature.description
      // setEditorState(feature.description)

      // localStorage.setItem("editorStage", feature.description)
    }

  },[feature])


  useEffect(() => {
    // Calcula la altura del contenido del textarea y configura la altura del textarea
    const textarea = document.getElementById('title-feature');
    if (textarea) {
      textarea.style.height = 'auto'; // Restablece la altura a 'auto' antes de calcular
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [titleFeature]);

  return (
    <section className="section-title-feature d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2">
        <div
          className="w-100"
          role="button"
          onClick={()=>{
              if(editModeTitle) return
              setEditModeTitle(true)
              setTitleFeature(titleFeature)
            }
          }
        >
          {
            editModeTitle ? (
              <textarea
                name="title-feature"
                id="title-feature"
                className="textarea-autosize w-100"
                value={titleFeature}
                autoFocus
                style={{height:"auto"}}
                onBlur={()=>{
                  setEditModeTitle(false)
                  if(feature.title !== titleFeature) {
                    const body = {
                      title:titleFeature,
                      description:feature.description,
                      is_watcher:false,
                      due_date:feature.due_date
                    }
                    handleUpdateFeature(body, 400)
                  }
                }}
                onChange={(e) => setTitleFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    setEditModeTitle(false);
                  }
                }}
                // onInput={handleTextareaInput}
              ></textarea>
            ):(
              <h3 className="fw-bold">{titleFeature}</h3>
            )
          }
        </div>
      </section>

  );
};

export default TitleDetailFeature;
