import AdminHeader from "../../containers/headers/admin.header";

import '../../styles/block.css'
import { useState, useEffect } from 'react';
import axios from 'axios'

import Block from "./block";
import { AiOutlineDown } from 'react-icons/ai'

import BASE_URL from '../../config'

const BlockList = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const userType = userProfile.UserType.toLowerCase()
    const [blocks, setBlock] = useState([])

    var isLoaded = false
    useEffect(() => {
        if (!isLoaded) {
            axios.get(`${BASE_URL}/chaincode/blocks/${userType}`)
                .then(res => setBlock(res.data.data))
            isLoaded = true
        }
    }, [isLoaded])
    const onLoad = () => {
        return Object.keys(blocks).map((key, index) => {
            return (
                <div className="block-container" key={key}
                    index={index}>
                        <div className="arrow">
                            <AiOutlineDown size={"30px"} />
                        </div>
                    <Block
                        block={blocks[key]}
                    />
                </div>
            )
        })
    }

    return (
        <div>
            <AdminHeader />
            <div className="container">
                <h1>Blockchain</h1>
                <div className="list-block">
                    {onLoad()}
                </div>
            </div>
        </div>
    )
}

export default BlockList