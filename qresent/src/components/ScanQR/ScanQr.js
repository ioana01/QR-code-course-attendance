import React, {useState, useRef} from 'react';
import {Container, Card, makeStyles, TextField, Button} from 'react-bootstrap';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import {store, useGlobalState} from 'state-pool';
import './ScanQR.css'
import { database } from '../../firebase'

store.setState("count", 0);

export default function ScanQr() {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] =  useState('');
    const qrRef = useRef(null);
    const [count, setCount] = useGlobalState("count");

    const handleErrorFile = (error) => {
        setScanResultFile(error);
    }

    const handleScanFile = (result) => {
        console.log(count);
        if (result && !count) {
            setScanResultFile('Successfuly added to the attendance list');
            document.getElementById('result').classList.toggle('toggle-result');
            setCount(count+1);
            
            const user = {
                moodle_account: '',
                time: new Date()
            }
            database.ref('attendance').push(user);
        } else if(result && count) {
            setScanResultFile('Already on the attendance list');
            document.getElementById('result').classList.toggle('toggle-result');
        }
    }

    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }

    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleScanWebCam = (result) => {
        if (result && !count){
            setScanResultWebCam('Successfuly added to the attendance list');
            document.getElementById('result-scan').classList.toggle('toggle-result');
            setCount(count+1);
            
            const user = {
                moodle_account: '',
                time: new Date()
            }
            database.ref('attendance').push(user); 
        } else if(result && count == 1) {
            setScanResultWebCam('Already on the attendance list');
            document.getElementById('result-scan').classList.toggle('toggle-result');
        }
    }

    return(
        <Container id='upload-container'>
            <Card>
                <div>
                    <div container spacing={2}>
                        <div item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <QrReader
                                id='qr-image'
                                className='qrcode-photo'
                                ref={qrRef}
                                delay={300}
                                onError={handleErrorFile}
                                onScan={handleScanFile}
                                legacyMode
                            />
                            <Button id='upload-button' variant="secondary"  onClick={onScanFile}>Upload a QR code</Button>
                            <h3 id='result' class='toggle-result'>Result: <span class='scan-result'>{scanResultFile}</span></h3>
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <div>
                    <div container spacing={2}>
                        <div item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <QrReader
                                delay={300}
                                className='qrcode-scan'
                                onError={handleErrorWebCam}
                                onScan={handleScanWebCam}
                            />
                            <h3 id='result-scan' class='toggle-result'>Result: <span class='scan-result'>{scanResultWebCam}</span></h3>
                        </div>
                    </div>
                </div>
            </Card>
        </Container>
    );
}