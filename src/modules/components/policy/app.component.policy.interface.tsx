import { Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControl, 
    Grid, 
    makeStyles, 
    TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from "react-i18next";
import { DialogRawProp } from ".";


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export default function InterfaceDialog(props: DialogRawProp) {
    const { t } = useTranslation();
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["itf-0"]);
    const [originClass, setOrigins] = useState([""]);
    const [interfaces, setInterfaces] = useState([""]);
    const [deduct, setDeduct] = useState(0);
    const [max_deduct, setMax_deduct] = useState(0);
    const [resItf, setResItf] = useState({
        state: false,
        origins: [] as string[],
        inherit: [] as string[],
        deductPoint : 0,
        maxDeduct: 0
    });


    const appendFields = () => {
        let element = `itf-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }

    },[isOpen]);


    useEffect(() => {
        props.onCreate("inheritInterface", resItf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resItf]);


    const handleOriginChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...originClass];
        newArr[index] = e.target.value;
        setOrigins(newArr);
    }


    const handleInterfaceChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...interfaces];
        newArr[index] = e.target.value;
        setInterfaces(newArr);
    }



    const handleClose = () => {
        setResItf({
            state: false,
            origins: [],
            inherit: [],
            deductPoint : 0,
            maxDeduct: 0
        });
        setOpen(false);
    }
    

    const handleResIO = () => {
        setResItf({
            state: true,
            origins: originClass,
            inherit: interfaces,
            deductPoint : deduct,
            maxDeduct: max_deduct
        });
        setOpen(false);
    }



    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-itf"
                maxWidth="md"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-itf">
            {t('policy.interface.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.interface.2')}
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>
                    {t('add')}
                </Button>
            </DialogContentText>

            <Grid container spacing={2}>
                <Grid item>   
                    <TextField
                        type="number"
                        value={deduct}
                        label={t('policy.basic.deduct')}
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="number"
                        value={max_deduct}
                        label={t('policy.basic.max')}
                        size="small"
                        margin="dense"
                        onChange={e => setMax_deduct(parseFloat(e.target.value) || max_deduct)}
                    />
                </Grid>
            </Grid>

            {fields.map((input, index) => (
                <Grid container spacing={1} key={index}>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={originClass[index] || ""}
                                variant="outlined"
                                id={"org-" + index}
                                label={t('Inherited class name')}
                                name={"org-" + index}
                                size="medium"
                                className="iorg"
                                onChange={handleOriginChange(index)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={interfaces[index] || ""}
                                variant="outlined"
                                id={"itf-" + index}
                                label={t('interface name')}
                                name={"itf-" + index}
                                size="medium"
                                className="itf"
                                onChange={handleInterfaceChange(index)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                <Button onClick={handleResIO} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}