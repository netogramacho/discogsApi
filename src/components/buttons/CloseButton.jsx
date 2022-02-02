import './CloseButton.css'

export default function CloseButton(props) {
    
    return(
        <div onClick={() => props.onClick()} className='closeButton'>
            <img src="/images/cross.png" alt="" />
        </div>
    )
}