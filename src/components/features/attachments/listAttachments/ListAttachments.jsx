import AttachmentItem from '../attachmentItem/AttachmentItem';
import './attachmentsStyle.css'

const ListAttachments = ({ListAttachments=[], handleDowloand, handleDelete, isLoadingDeleteAtt}) => {

  return (
    <section className='attachment-section'>

      <div
        className='attachment-list-container d-flex justify-content-center gap-2 flex-wrap'
      >
        {
          ListAttachments.map(attachment=>(
            <AttachmentItem
              key={attachment.id}
              id={attachment.id}
              url={attachment.url}
              name={attachment.name}
              createdAt={attachment.created_at}
              extension={attachment.attachment_type.extension}
              mimeType={attachment.attachment_type.mimetype}
              isImage={attachment.isImage}
              iconPreview={attachment.iconPreview}
              handleDowloand={handleDowloand}
              handleDelete={handleDelete}
              isLoadingDeleteAtt={isLoadingDeleteAtt}
            />
          ))
        }
      </div>
    </section>
  );
};

export default ListAttachments;
