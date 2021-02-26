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

    const notify = (arg) => {
        if (arg === 'complete');
            
        //NEED TODO using snackbar
        
    }
    
    const fileUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post('/api/grade/execute', formData, {
            
            params: {
                studentNum: '21600065',
                assignment: props.name
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
                console.log(response.data)
                notify('complete')
            })
            .catch((response) => {
                setloading(false)
                console.log(response.data)
                notify('error')
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
                    <Button type="submit" variant="contained" color="inherit" size="large" startIcon={<CloudUpload />} disabled={disabled} onClick={handleClick}>
                        Upload
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
        </div>   
    )
}

export default FileUploadComponent;