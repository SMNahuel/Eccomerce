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
    const [state, setState] = useState({
        action: false,
        oldPassword: null,
        newPassword: null
    })

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
    const handlePassword = () => {
        if(state.action === false){
            setState({...state, action: true})
        }else{
            setState({...state, action: false})
        }
    }
    
    const onChange = function(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const changePassword = function(){
        dispatch(api.passwordChange({
            oldPassword: state.oldPassword,
            newPassword: state.newPassword
        }))
        setState({...state, action: false})
    } 
    return (

        <div className={s.justify}>
            {
                state.action === true &&
                <form className={s.formPassword}>
                    <div>
                        <input 
                        type="password"
                        placeholder="Ingrese su anterior contraseña" 
                        name="oldPassword"
                        onChange={onChange}
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        >
                        </input>
                    </div>
                    <div>
                        <input 
                        placeholder="Ingrese nueva contraseña"
                        type="password"
                        name="newPassword"
                        onChange={onChange}
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        >

                        </input>
                    </div>
                    <div>
                        <input 
                        placeholder="Repita la nueva contraseña"
                        type="password"
                        pattern="[A-Za-z0-9 ]{5,100}"
                        maxLength="100"
                        autoComplete="off"
                        >
                        </input>
                    </div>
                    <Button variant="contained" color="primary" onClick={changePassword}>Aceptar</Button>
                    <Button variant="contained" color="secondary" onClick={handlePassword} >Cancelar</Button>
                </form>
            }
            {
            state.action === false &&
            <Card className={s.justifyCard}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {user.name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            {user.email}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {user.rol}
                        </Typography>
                        
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Input type="file" size="small" color="primary">
                        Selecciona imagen de perfil
                    </Input>
                </CardActions>
                <CardActions>
                    <Button type="submit" size="small" color="primary">
                        Cargar
                    </Button>
                </CardActions>
                <Button onClick={handlePassword}> 
                Cambiar password 
                </Button>
                   
                    
                
            </Card>
            }

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
    );
}

export default UserProfile;


