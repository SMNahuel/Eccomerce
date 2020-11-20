import React, { useState } from 'react';
import s from './UserProfile.module.css'
import api from '../../redux/action-creators'
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import dataURLtoFile from '../../utils/dataURLtoFile';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';


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
        <div className={s.justifyDiv}>
            <Box className={s.justify} boxShadow={3} >
                <div >
                    <div className={s.justifyAv}>
                        <Avatar
                            className={s.avatarSize}
                            src={image}
                        />
                    </div>
                    <div className={s.button}>                            
                        <input 
                            className={s.input}
                            onChange={selectImg}
                            accept="image/*"
                            id="file"
                            type="file"
                        />
                        <label htmlFor="file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                            <Button onClick={onSubmit} variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                    </div>
                    <ThemeProvider theme={theme}>
                        <Typography className={s.text} variant="h4">{user.name}</Typography>
                        <Typography className={s.text} variant="h5">{user.email}</Typography>
                        <Typography className={s.text} variant="h5">Usuario: {user.rol}</Typography>
                    </ThemeProvider>
                    
                </div>
            </Box>
        </div>
    );
}

export default UserProfile;


