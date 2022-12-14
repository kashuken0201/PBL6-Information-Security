import convertUTCDateToLocalDate from "../../utils/convert-date";
import '../../styles/block.css'

const Block = (props) => {
    return (
        <div className="block">
            <div className="title-block ">
                <h3>Block {props.block.Number}</h3>
                <span>{convertUTCDateToLocalDate(new Date(props.block.Timestamp)).toLocaleString()}</span>
            </div>
            <div className="hash">
                <span>PREVIOUS HASH</span>
                <div className="previous-hash">
                    <span className='data'>{props.block.PreviousHash}</span>
                </div>
            </div>
            <div className="hash">
                <span className='data'>HASH</span>            
                <div className="data-hash">
                    <span>{props.block.DataHash}</span>
                </div>
            </div>
            <div className='hash'>
            <span className='data'>Action</span>            
                <div className="data-hash">
                    <span>0004c8c1f15fedb537ebe52fa97902c4650b252cc29eae0c95647dcf3f73f9f5</span>
                </div>
            </div>

        </div>
    )
}

export default Block