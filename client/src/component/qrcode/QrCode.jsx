import React from "react";
import QRCode from 'qrcode'
import { useState , useEffect} from 'react'
import './QrCode.scss'

const QrCode = () => {  

    const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')

    const GenerateQRCode = () => {
        QRCode.toDataURL(url, {
            width: 400,
            margin: 2,
            color: {
                dark: '#335383FF',
                light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)

            console.log(url)
            setQr(url)
            console.log(qr);
        })
    }
    

    return (

        <div className="qrcode">
            <h1>Your QR Ticket</h1>
            <input 
                type="text"
                placeholder="e.g. https://google.com"
                value={url}
                onChange={e => setUrl(e.target.value)} />
            <button onClick={GenerateQRCode} className="button">Generate</button>
            {qr && <>
                <img src={qr} className="image" />
                <a href={qr} download="qrcode.png">Download</a>
            </>}

        </div>

    )

};

export default QrCode;