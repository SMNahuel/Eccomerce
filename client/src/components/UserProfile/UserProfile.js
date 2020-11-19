import React from 'react';
import s from './UserProfile.module.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

function UserProfile(props) {

    const user = useSelector(state => state.user)

    const image = user.image &&
        `${process.env.REACT_APP_API_URL}${user.image}`

    return (
        <div className={s.justify}>
            <Card className={s.justifyCard}>
                <CardActionArea>
                    {(image) && (<CardMedia
                        component="img"
                        alt="Profile"
                        maxHeight="100vh"
                        image={image}
                        title="Profile"
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
                    <Input type='file'>
                        Selecciona imagen de perfil
                    </Input>
                    <Button type="submit" class="btn">
                        Cargar
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default UserProfile;


