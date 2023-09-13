import { useEffect } from "react";

const TitleDetailFeature = ({titleFeature, setTitleFeature, setEditModeTitle}) => {
  useEffect(() => {
    // Calcula la altura del contenido del textarea y configura la altura del textarea
    const textarea = document.getElementById('title-feature');
    if (textarea) {
      textarea.style.height = 'auto'; // Restablece la altura a 'auto' antes de calcular
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [titleFeature]);

  return (
    <textarea
      name="title-feature"
      id="title-feature"
      className="textarea-autosize w-100"
      value={titleFeature}
      autoFocus
      style={{height:"auto"}}
      onBlur={()=>setEditModeTitle(false)}
      onChange={(e) => setTitleFeature(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.shiftKey) {
          setEditModeTitle(false);
        }
      }}
      // onInput={handleTextareaInput}
    ></textarea>
  );
};

export default TitleDetailFeature;
