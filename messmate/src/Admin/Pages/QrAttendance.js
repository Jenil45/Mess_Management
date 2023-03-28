import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';


const AttendanceQr = () => {
  const [text, setText] = useState('');
  const [data , setData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');

  // const 

  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }

  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
        const userId = scanResultWebCam.userId;
        try {
          
        } catch (error) {
          
        }
    }
   }


  return (
    <div className='flex'>
      <div className='flex-[1] flex items-center justify-center'>
        <input className='border border-[2px] rounded p-[0.4rem]' label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
        <button onClick={() => generateQrCode()}>Generate</button>
          <br/>
          <br/>
          <br/>
          {imageUrl ? (
            <a href={imageUrl} download>
            <img src={imageUrl} alt="img"/>
            </a>) : null
          }

        <div>
          {

          }
        </div>
      </div>
      <div className='flex-[1] w-[20rem] h-[20rem]'>
      <h3>Qr Code Scan by Web Cam</h3>
        <QrReader
          delay={300}
          style={{}}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
        />
        <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
      </div>
    </div>
  )
}

export default AttendanceQr
