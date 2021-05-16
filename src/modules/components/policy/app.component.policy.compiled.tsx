import { Button, 
    Checkbox, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControlLabel, 
    Grid, 
    TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { DialogRawProp } from ".";



export default function CompiledDialog(props: DialogRawProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(0);
    const [gradle, setGradle] = useState(false);
    const [resCom, setResCom] = useState({
        state: false,
        deductPoint : 0,
        buildTool: false,
    });


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }
    },[isOpen]);


    useEffect(() => {
        props.onCreate("compiled", resCom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resCom]);


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setGradle(e.target.checked);
    }


    const handleClose = () => {
        setResCom({
            state: false,
            deductPoint : 0,
            buildTool: false,
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResCom({
            state: true,
            deductPoint : deduct,
            buildTool: gradle,
        });
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-com"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-pk">{t('policy.compiled.1')}</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.compiled.2')}
            </DialogContentText>
            <FormControlLabel
                control={
                    <Checkbox checked={gradle}
                            onChange={handleChange}
                            name="count" />}
                label={t('policy.compiled.build')}
            />
            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        type="number"
                        value={deduct}
                        label={t('policy.basic.deduct.boolean')}
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
            </Grid>
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