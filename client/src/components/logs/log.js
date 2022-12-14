import '../../styles/popup.css'
import { useState } from 'react';

const Log = (props) => {
    const [product, setProduct] = useState(props.product)

    const setStatus = () => {
        const status = props.product.Status
        if (status === 'Available')
            return (
                <div className="border border-success bg-success rounded">
                    <span>{status}</span>
                </div>
            )
        else if (status === 'Ordered')
            return (
                <div className="border border-warning bg-warning rounded">
                    <span>{status}</span>
                </div>
            )
        else if (status === 'Sold')
            return (
                <div className="border border-primary bg-primary rounded">
                    <span>{status}</span>
                </div>
            )
        return (
            <div className="border border-secondary bg-secondary rounded">
                <span>{status}</span>
            </div>
        )
    }
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.close}>x</span>
                <div className='row'>
                    <div className='col-9'>
                        <h3>Product</h3>
                    </div>
                    <div className='col-3'>
                        {setStatus()}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-4'>
                                Product Name:
                            </div>
                            <div className='col-8'>
                                {product.Name}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Price:
                            </div>
                            <div className='col-8'>
                                {product.Price}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Description:
                            </div>
                            <div className='col-8'>
                                {product.Description}
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-4'>
                                Manufactured Date:
                            </div>
                            <div className='col-8'>
                                {product.Date.ManufacturedDate}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Ordered Date:
                            </div>
                            <div className='col-8'>
                                {product.Date.OrderedDate}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Sold Date:
                            </div>
                            <div className='col-8'>
                                {product.Date.SoldDate}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Delivered Date:
                            </div>
                            <div className='col-8'>
                                {product.Date.DeliveredDate}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                        <div className='row'>
                            <div className='col-4'>
                                Created by:
                            </div>
                            <div className='col-8'>
                                {product.ManufacturerName}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Ordered by:
                            </div>
                            <div className='col-8'>
                                {product.ConsumerID}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Sold by:
                            </div>
                            <div className='col-8'>
                                {product.ManufacturerName}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                Delivered by:
                            </div>
                            <div className='col-8'>
                                {product.ManufacturerName}
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Log