// import { useState } from 'react';
// import { DeleteIcon } from '../../../utils/icons/iconsMenu';
import './featureCard.css'
import { useSortable } from '@dnd-kit/sortable';
import { typesCards } from '../../../Menu';
import { CSS } from '@dnd-kit/utilities';

const FeatureCard = ({
  id,
  feature,
  setSelectedFeature
}) => {
  // const [mouseIsOver, setMouseIsOver] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data:{
      type:typesCards.FEATURE,
      feature
    },
    // disabled:isEditTitleStage
  })

  const styles = {
    transition,
    transform:CSS.Transform.toString(transform),
  }

  // if(isDragging){
  //   return(
  //     <div
  //       ref={setNodeRef}
  //       style={styles}
  //       className='border border-top-2'
  //     />
  //   )
  // }

  return (

    <div
      ref={setNodeRef}
      style={styles}
      {...attributes}
      {...listeners}
      className={
        isDragging ? "card-feature px-2 py-3 opacity-25 border border-secondary" :
        "card-feature px-2 py-3"
      }
      // onMouseEnter={
      //  ()=>setMouseIsOver(true)
      // }
      // onMouseLeave={
      //   ()=>setMouseIsOver(false)
      // }
    >
      <div

        className={
        'd-flex justify-content-between'
      }>
        <div
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#modalFeature"
          onClick={()=>setSelectedFeature(feature)}
        >
          {feature.title}
        </div>
        {/* <button type="button" onClick={()=>console.log("hola")}>
          <span>
            {
              mouseIsOver && (
                <DeleteIcon fill="var(--blueDark)"/>
              )
            }
          </span>
        </button> */}
      </div>
    </div>
  );
};

export default FeatureCard;
