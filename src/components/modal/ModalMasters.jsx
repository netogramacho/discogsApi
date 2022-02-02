import CloseButton from "../buttons/CloseButton";
import './ModalMasters.css'

export default function ModalMasters(props) {
    
    
    return(
        <div className='modalDetails'>
            <CloseButton onClick={props.fn} />
            <div className='modalImage'>
                <img src={props.img} alt="" />
            </div>
            <div className='modalTexts'>
            <span className='modalTextsName'>
                {props.name}
            </span>
            <span className='modalTextsTitle'>
                {props.title}
            </span>
            <span className='modalTextsYear'>
                {props.year}
            </span>
            <span className='modalTextsNotes'>
                { 
                (props.notes) ?
                props.notes
                :
                "Notes not found"
                }
            </span>
            </div>
        </div>
    )
}