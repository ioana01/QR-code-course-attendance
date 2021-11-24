import React, { useState, useRef, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import QrReader from 'react-qr-reader';
import { store, useGlobalState } from 'state-pool';
import './ScanQR.css';
import { auth, database } from '../../firebase';

store.setState("count", 0);

export default function ScanQr() {
    const [currentUser, setUser] = useState({});
    const [file_upload_message, setFileMessage] = useState('');
    const [web_cam_message, setWebCamMessage] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] =  useState('');
    const qrRef = useRef(null);
    const [count, setCount] = useGlobalState("count");

    useEffect(() => {
        database
        .ref('students/')
        .once('value')
        .then(snapshot => {
            snapshot.forEach((child) => {
                let dict = child.val();
                if (dict["email"] == auth.currentUser.email){
                    setUser(child.val());
                }
            });
        });
    }, [])

    const handleErrorFile = (error) => {
        setFileMessage(error);
    }

    const checkTime = (time) => {
        const utcSeconds = time.length === 13 ? Math.floor(parseInt(time) / 1000) : parseInt(time);
        const currentTimeSeconds = Math.floor(new Date().getTime() / 1000);

        if(utcSeconds + 120 < currentTimeSeconds) {
            return false;
        }

        return true;
    }

    const handleScanFile = (result) => {
        if (result && !count) {
            setScanResultFile(result);
            const urlSearchParams = new URLSearchParams(result);
            const params = Object.fromEntries(urlSearchParams.entries());

            if(!checkTime(params[Object.keys(params)[0]])) {
                setFileMessage('Codul QR a expirat');
                document.getElementById('result-upload').classList.remove('toggle-result');
            } else {
                setFileMessage(`Adaugat pe prezenta la materia ${params[Object.keys(params)[1]].split('$')[0]}`);
                document.getElementById('result-upload').classList.remove('toggle-result');
                setCount(count+1);
                
                const user = {
                    moodle_account: auth.currentUser.email.split('@')[0],
                    time: (new Date()).toString(),
                    course: params[Object.keys(params)[1]].split('$')[0],
                    name: currentUser.name,
                    group: currentUser.group
                }
                database.ref('attendance').push(user);
            }
            
        } else if(result && count) {
            setFileMessage('Deja trecut pe lista de prezenta');
            document.getElementById('result-upload').classList.remove('toggle-result');
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
            setScanResultWebCam(result);
            const urlSearchParams = new URLSearchParams(result);
            const params = Object.fromEntries(urlSearchParams.entries());

            if(!checkTime(params[Object.keys(params)[0]])) {
                setWebCamMessage('Codul QR a expirat');
                document.getElementById('result-scan').classList.remove('toggle-result');
            } else {
                setWebCamMessage(`Adaugat pe prezenta la materia ${params[Object.keys(params)[1]].split('$')[0]}`);
                document.getElementById('result-scan').classList.remove('toggle-result');
                setCount(count+1);
                
                const user = {
                    moodle_account: auth.currentUser.email.split('@')[0],
                    time: (new Date()).toString(),
                    course: params[Object.keys(params)[1]].split('$')[0],
                    name: currentUser.name,
                    group: currentUser.group
                }
                database.ref('attendance').push(user);
            }
        } else if(result && count == 1) {
            setWebCamMessage('Deja trecut pe lista de prezenta');
            document.getElementById('result-scan').classList.remove('toggle-result');
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
                            <h3 id='result-upload' class='toggle-result'>Result: <span class='scan-result'>{file_upload_message}</span></h3>
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
                            <h3 id='result-scan' class='toggle-result'>Result: <span class='scan-result'>{web_cam_message}</span></h3>
                        </div>
                    </div>
                </div>
            </Card>
        </Container>
    );
}