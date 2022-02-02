import './Discs.css'

export default function Discs(props) {

    return(
        
      <div onClick={() => {props.onClick()}} className='DiscLine'>
        <div className='DiscLine--Thumb'>
          <img src={props.thumb} alt="" />
        </div>
        <span className='DiscLine--Name'>{props.title}</span>
        <span className='DiscLine--Year'>{props.year}</span>

      </div>
    )
}