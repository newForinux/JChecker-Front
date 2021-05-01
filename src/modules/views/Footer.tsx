import { Container, Grid, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import Typographic from '../components/Typographic';
import React from "react";



function Copyright() {
    return (
        <React.Fragment>
            {'ⓒ '}
            <Link color="inherit" href="https://isel.handong.edu/">
                <b>ISEL</b> Lab in Handong Global University.
            </Link>{' '}
            {new Date().getFullYear()}<br />
        </React.Fragment>
    );
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    container: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
    },
    iconsWrapper: {
        height: 60,
    },
    iconsWrapperSecondary: {
        height: 76,
        marginBottom: theme.spacing(1),
        alignItems: 'center',
    },
    icons: {
        minWidth: 15,
        maxWidth: 25,
        [theme.breakpoints.up('sm')]: {
            minWidth: 25,
            maxWidth: 30,
        },
        [theme.breakpoints.up('xl')]: {
            minWidth: 30,
            maxWidth: 40,
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    logoIcons: {
        maxWidth: 180,
        maxHeight: 30,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 250,
            maxHeight: 40,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 300,
            maxHeight: 50,
        },
        display: 'flex',
        marginRight: theme.spacing(1),
    },
    labIcons: {
        width: 36,
        hidth: 34,
        [theme.breakpoints.up('sm')]: {
            width: 50,
            height: 52,
        },
        [theme.breakpoints.up('xl')]: {
            width: 81,
            height: 84,
        },
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    backgroundIcons: {
        width: 120,
        height: 46,
        [theme.breakpoints.up('sm')]: {
            width: 160,
            height: 61,
        },
        [theme.breakpoints.up('xl')]: {
            width: 200,
            height: 71,
        },
        display: 'flex',
        justifyContent: 'center',
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    white: {
        color: theme.palette.common.white,
    }
}));



function AppFooter() {
    const classes = useStyles();

    return (
        <Typography component="footer" className={classes.root}>
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item>
                    <Grid
                        container
                        direction='row'
                        justify="flex-start"
                        className={classes.iconsWrapperSecondary}
                    >
                        <img src="/assets/logo.png" alt="logo" className={classes.logoIcons}/>
                    </Grid>
                    
                    <Grid item>
                        <Copyright />

                        <Typographic variant="caption" gutterBottom>
                            {'Icons made by '}
                            <Link href="https://www.freepik.com" rel="sponsered" title="Freepik" className={classes.white}>
                                <b>Freepik</b>
                            </Link>
                            {' from '}
                            <Link href="https://www.flaticon.com" rel="sponsered" title="Flaticon" className={classes.white}>
                                www.flaticon.com
                            </Link>
                            {' is licensed by '}
                            <Link href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer" className={classes.white}>
                                CC 3.0 BY
                            </Link>
                        </Typographic>

                        <Grid container direction="row" justify="flex-start">
                            <Grid item className={classes.icons}>
                                <a href="https://github.com/newForinux" className={classes.icons}>
                                    <img src="/assets/github.svg" alt="Github" />
                                </a>
                            </Grid>
                            <Grid item className={classes.icons}>
                                <a href="https://github.com/Yessir-kim" className={classes.icons}>
                                    <img src="/assets/github.svg" alt="Github" />
                                </a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item>
                    <Grid container direction="row" justify="flex-start">
                        <Grid item className={classes.backgroundIcons}>
                            <img src="/assets/hand.png" alt="Handong" className={classes.backgroundIcons}/>
                        </Grid>
                        <Grid item className={classes.backgroundIcons}>
                            <img src="/assets/ISEL-t.png" alt="ISEL" className={classes.labIcons}/>
                        </Grid>
                    </Grid>
                    <Typographic variant="caption" gutterBottom>
                        Handong Global University 558 Handong-ro <br />Buk-gu, Pohang Gyeongbuk 37554 Republic of Korea
                    </Typographic>
                </Grid>
            </Grid>
        </Container>
        </Typography>
    )
}


export default React.memo(AppFooter);