import React,{ useState } from 'react';
import s from './UserProfile.module.css'
import api from '../../redux/action-creators'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import dataURLtoFile from '../../utils/dataURLtoFile'

function UserProfile(props) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [img, setImg] = useState(null);

    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image}`

    const selectImg = e => {
        let input = document.getElementById("file")
        let fReader = new FileReader();
        fReader.onloadend = event => setImg({src:event.target.result, name:input.files[0].name})
        fReader.readAsDataURL(input.files[0]);
    }
    
    const onSubmit = e => {
        if (img) {
            var formData = new FormData();
            formData.append("image", dataURLtoFile(img.src), img.name)
            dispatch(api.addImgUser(formData))
            window.location.reload()
        }
    }

    return (
        <div className={s.justify}>
            <Card className={s.justifyCard}>
                <div >
                    <CardActionArea>
                        {(image) && (<Avatar 
                            className={s.avatarSize}
                            src={image} 
                        />)}
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
                        <Input onChange={selectImg} type='file' id="file" accept="image/*">
                            Selecciona imagen de perfil
                        </Input>
                        <Button onClick={onSubmit} type="submit">
                            Cargar
                        </Button>
                    </CardActions>                
                </div>
            </Card>
        </div>
    );
}

export default UserProfile;


