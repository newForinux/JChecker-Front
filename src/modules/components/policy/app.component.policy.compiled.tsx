import { Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Grid, 
    TextField } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { DialogRawProp } from ".";



export default function CompiledDialog(props: DialogRawProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(0);
    const [resCom, setResCom] = useState({
        state: false,
        deductPoint : 0,
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



    const handleClose = () => {
        setResCom({
            state: false,
            deductPoint : 0,
        });
        setOpen(false);
    }


    const handleResIO = () => {
        setResCom({
            state: true,
            deductPoint : deduct,
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