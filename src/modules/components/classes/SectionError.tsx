import { makeStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import AppbarView from '../../views/Appbar';
import StarterMajorLayout from '../../views/SectionLayout';
import AppFooter from '../../views/Footer';
import Typographic from '../Typographic';
import WithRoot from '../../root';

const backgroundImage = 'https://images.unsplash.com/photo-1555861496-0666c8981751?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';


const useStyles = makeStyles((theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#5d5447',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 125,
    },
    h2: {
        fontFamily: 'ELAND_Choice_M',
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
        fontFamily: 'JSDongkang-Regular',
        lineHeight: 2,
    },
    more: {
        marginTop: theme.spacing(2),
    },
    textField: {
        background: 'white',
    },
    resize: {
        fontSize: 20,
    },
}));



function SectionError (props: RouteComponentProps) {
    const classes = useStyles();
    const { t } = useTranslation(); 


    return (
        <>
        <AppbarView />
        <StarterMajorLayout backgroundClassName={classes.background}>
            {}
            <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
            <Typographic color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
                {t('error.1')}
            </Typographic>
            <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                <b>{t('error.2')}</b><br />
                {t('error.3')}<br />
                {t('error.4')}<br />
            </Typographic>
        </StarterMajorLayout>
        <AppFooter />
        </>
    );
}


export default React.memo(WithRoot(SectionError));