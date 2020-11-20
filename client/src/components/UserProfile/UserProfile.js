import React, { useState } from 'react';
import s from './UserProfile.module.css'
import api from '../../redux/action-creators'
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import dataURLtoFile from '../../utils/dataURLtoFile';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Header from '../home/header/Header'
import styl from '../home/header/Header.module.css'


function UserProfile(props) {

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [img, setImg] = useState(null);

    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image}`

    const onSubmit = e => {
        if (img) {
            var formData = new FormData();
            formData.append("image", dataURLtoFile(img.src), img.name)
            dispatch(api.addImgUser(formData))
            window.location.reload()
        }
    }

    const selectImg = e => {
        let input = document.getElementById("file")
        let fReader = new FileReader();
        fReader.onloadend = event => setImg({ src: event.target.result, name: input.files[0].name })
        fReader.readAsDataURL(input.files[0]);
    }

    return (
    
        <> 
        <div className={styl.navBar}>
            <Header/>   
        </div>       

        <div className={s.justifyDiv}>
            <div className={s.boxStyle} >                
                <div className={s.justifyAv}>
                    <div>
                        <Avatar
                            className={s.avatarSize}
                            src={image}
                        />
                    </div>
                    <div className={s.cameraButton}>
                        <input 
                            className={s.input}
                            onChange={selectImg}
                            accept="image/*"
                            id="file"
                            type="file"
                        />
                        <label htmlFor="file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera fontSize="large" />
                            </IconButton>
                        </label>
                    </div>
                </div>
                <div className={s.button}>                            
                    <Button onClick={onSubmit} variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </div>
                <ThemeProvider theme={theme}>
                    <Typography className={s.text} variant="h4">{user.name}</Typography>
                    <Typography className={s.text} variant="h5">{user.email}</Typography>
                    <Typography className={s.text} variant="h5">Usuario: {user.rol}</Typography>
                </ThemeProvider>               
            </div>
        </div>
        </>
    );
}

export default UserProfile;


