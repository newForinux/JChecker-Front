import { useState } from "react";
import Button from '@material-ui/core/Button';
import { CloudUpload } from '@material-ui/icons';
import axios from 'axios';
import { CircularProgress, makeStyles } from "@material-ui/core";
import { blue } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto',
        alignItems: 'center',
        textAlign: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: blue[800],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -10,
    },
}));



function FileUploadComponent (props) {
    const classes = useStyles();
    const [file, setfile] = useState(null);
    const [disabled, setdisabled] = useState(true);
    const [loading, setloading] = useState(false);
    
    const fileUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post('http://isel.lifove.net/api/grade/execute', formData, {
        //return axios.post('/api/grade/execute', formData, {
            params: {
                studentNum: props.id,
                token: props.name,
            },
            
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })  
    };


    const upload = (e) => {
        e.preventDefault();
        setdisabled(true)
        fileUpload(file)
            .then((response) => {
                setloading(false)
                props.onCreate(true, response.data);
            })
            .catch((response) => {
                setloading(false);
                props.onCreate(false, null);
            })
    };


    const fileChange = (e) => {
        setfile(e.target.files[0])
        setdisabled(false)
    };


    const handleClick = () => {
        if (!disabled) {
            setloading(true);
        }
    }


    return (
        <div>
            <form onSubmit={upload} className={classes.form}>
                <input accept="application/zip" type="file" onChange={fileChange} name="file" />      
                <div className={classes.wrapper}>
                    <Button type="submit" variant="contained" color="secondary" size="large" startIcon={<CloudUpload />} disabled={props.id.length !== 8 || disabled} onClick={handleClick}>
                        Upload
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
        </div>   
    )
}

export default FileUploadComponent;