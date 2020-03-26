
import React from 'react'
import { Typography } from 'antd'

const {Title} = Typography;

function MainImage(props) {
    return (
        <div style={{
            background:`linear-gradient(to bottom, rgba(0,0,0,0)
            30%, rgba(0,0,0,0)
            41%, rgba(0,0,0,0.56)
            100%),
            url('${props.image}'), #1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            width: '100%',
            position: 'relative'}}>

                <div style={{
                    position: 'absolute',
                    maxWidth:'500px',
                    bottom: '2rem'}}>
                        <Title style={{colr:'#ff'}} level={2}>{props.title}</Title>
                <p style={{color:'#fff', fontSize:'1rem'}}>{props.text}</p>
                </div>
        </div>
    )
}

export default MainImage
