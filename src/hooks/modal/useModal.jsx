import { useCallback, useMemo, useState } from "react";
import ModalWrapper from "../../components/wysiwyg/ui/modal/Modal";


export default function useModal() {
  const [modalContent, setModalContent] = useState(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, closeOnClickOutside } = modalContent;
    return (
      <ModalWrapper
        onClose={onClose}
        title={title}
        open={!!modalContent}
        closeOnClickOutside={closeOnClickOutside}
      >


        {content}
      </ModalWrapper>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      title,
      getContent,
      closeOnClickOutside = false
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose]
  );

  return [modal, showModal];
}
