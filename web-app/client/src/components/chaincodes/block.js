import convertUTCDateToLocalDate from "../../utils/convert-date";
import '../../styles/block.css'

const Block = (props) => {
    const togglePopup = (e) => {

    }
    const setPopup = (e) => {
        return (<div>

        </div>)
    }
    const setDisplay = () => {
        var x = document.getElementById("json-id");
        x.style.display = "none";
    }
    const showBlockDetail = () => {
        var x = document.getElementById("json-id");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    return (
        <div className="row">
            <div className="block col-6" onClick={togglePopup}>
                <div className="title-block ">
                    <h3>Block #{props.block.Number}</h3>
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
                    <span className='data'>TXID</span>
                    <div className="tx-id">
                        <span>{props.block.TxID}</span>
                    </div>
                </div>
                <div className='hash'>
                    <span className='data'>CREATOR</span>
                    <div className="creator">
                        <span>{props.block.Creator}</span>
                    </div>
                </div>
                <div className="btn btn-primary" onClick={showBlockDetail}>Value</div>
            </div>
            <div className="col-6">
                <div id="json-id" className="json">
                    <span>{JSON.stringify(props.block.Value)}</span>
                </div>
            </div>
            {/* <div className="json">
                <code>{new JsonViewer({
                    container: document.getElementsByClassName('json')[0],
                    data: JSON.stringify(props.block.Value),
                    theme: 'light',
                    expand: false
                })}</code>
            </div> */}
        </div>

    )
}

export default Block