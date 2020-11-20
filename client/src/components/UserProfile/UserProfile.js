import React, {useState}from 'react';
import s from './UserProfile.module.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../redux/action-creators';



function UserProfile(props) {
    const [state, setState] = useState({
        action: false,
        oldPassword: null,
        newPassword: null
    })
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const data = () => {
        console.log(user)
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
        </div>
    );
}

export default UserProfile;


