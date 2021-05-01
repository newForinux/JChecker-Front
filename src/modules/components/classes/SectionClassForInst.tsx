import { AppBar, Link, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router"
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";
import axios from "axios";
import { ClassroomInstProps, RouteParamsProps } from ".";
import SectionTable from "./SectionTable";



const backgroundImages = "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80";


const backgroundImage = backgroundImages;


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
    },
    more: {
        marginTop: theme.spacing(2),
    },
    title: {
        fontSize: 42,
        letterSpacing: 7,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    logo: {
        marginTop: theme.spacing(1),
        maxWidth: 200,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 250,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 300,
        },
    },
}));


const useStylesLayout = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        minHeight: 500,
        maxHeight: 800,
        [theme.breakpoints.up('sm')]: {
            height: '100vh',
            minHeight: 800,
            maxHeight: 1300,
        },
    },
}));


function EachClass(props: RouteComponentProps<RouteParamsProps>) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();

    const initial = {
        itoken: "",
        className: "",
        instructor: "",
        createDate: "",
    };


    const [classroom, setClassroom] = useState(initial);
    const [load, setLoad] = useState(false);
    const [dataGroup, setDataGroup] = useState<Object[]>( [] );
    const [keyGroup, setKeyGroup] = useState<Object[]>( [] );

    const handleLoad = () => {
        setLoad(true);
    }

    function clean (obj: Object[]) {
        for (var keys in obj) {
            if (keys === 'id' || keys === 'isDirect' || keys === 'token')
                delete obj[keys];

            if (obj[keys] === null || obj[keys] === undefined) {
                delete obj[keys];
            }
        }

        return obj;
    }


    useEffect(() => {
        if (classroom === initial) {
            const currentClassroomState = async (): Promise<ClassroomInstProps[]> => {
                return await axios.get<ClassroomInstProps[]>('http://isel.lifove.net/api/token/')
                // return await axios.get<ClassroomInstProps[]>('/api/token/')
                .then((response) => {
                    return response.data
                });
            };

            const getGradingData = async () => {
                return await axios.get('/api/grade/', {
                    params: {
                        itoken: props.match.params.token
                    },
                }).then((response) => {
                    return response.data;
                });
            }

            currentClassroomState()
            .then(response => {
                setClassroom(response.find(element => element.itoken === props.match.params.token) || initial);
                if (response.find(element => element.itoken === props.match.params.token) === undefined) {
                    props.history.push('/jchecker');
                    alert("클래스가 없습니다.😅");
                }
                
                getGradingData()
                .then((response) => {
                    var i = 0;
                    for (; i < response.length; i++) {
                        const element = clean(response[i]);

                        if (i === 0) {
                            setKeyGroup(Object.keys(element));
                        }

                        setDataGroup(old => [ ...old, element]);
                    }

                    handleLoad();
                })
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[classroom, load]);


    return (
        <>
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }} >
                <Toolbar className={classesStyle.toolbar}> 
                    <Link
                        variant="h3"
                        underline="none"
                        color="inherit"
                        className={classesStyle.title}
                        href="/jchecker"
                    >
                        <img src="/assets/logo.png" alt="logo" className={classesStyle.logo} />
                    </Link>
                </Toolbar>
            </AppBar>
            <SectionLayout backgroundClassName={classesStyle.background} classes={classesLayout}>
                <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
                <Typographic color="inherit" align="center" variant="h2" marked="center" className={classesStyle.h2}>
                    {classroom.className}
                </Typographic>
                
                {load && <SectionTable pre={keyGroup} values={dataGroup} />}

                <Typographic color="inherit" align="center" variant="h5" className={classesStyle.h5}>
                    opened by <b>{classroom.instructor}</b> on {classroom.createDate}
                </Typographic>

            </SectionLayout>
            <AppFooter />
        </>
    
    );
}


export default React.memo(WithRoot(EachClass));