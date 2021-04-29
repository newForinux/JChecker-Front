import { green, grey, red } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const rawTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#69696a',
            main: '#28282a',
            dark: '#1e1e1f',
        },
        secondary: {
            light: '#f5f7ff',
            main: '#4a6eff',
            dark: '#282c40',
        },
        warning: {
            main: '#ffc071',
            dark: '#ffb25e',
        },
        error: {
            light: red[50],
            main: red[500],
            dark: red[500],
        },
        success: {
            light: green[50],
            main: green[500],
            dark: green[500],
        },
    },

    typography: {
        fontFamily: "'Sen', 'ELAND_Choice_M', sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 700,
    },
});


const fontHeader = {
    color: rawTheme.palette.text.primary,
    fontWeight: rawTheme.typography.fontWeightMedium,
    fontFamily: rawTheme.typography.fontFamily,
}


const theme = {
    ...rawTheme,
    palette: {
        ...rawTheme.palette,
        background: {
            ...rawTheme.palette.background,
            default: rawTheme.palette.common.white,
            placeholder: grey[200],
        },
    },

    typography: {
        ...rawTheme.typography,
        fontHeader,
        h1: {
            ...rawTheme.typography.h1,
            ...fontHeader,
            letterSpacing: 0,
            fontSize: 60,
        },
        h2: {
            ...rawTheme.typography.h2,
            ...fontHeader,
            fontSize: 52,
        },
        h3: {
            ...rawTheme.typography.h3,
            ...fontHeader,
            fontSize: 42,
        },
        h4: {
            ...rawTheme.typography.h4,
            ...fontHeader,
            fontSize: 36,
        },
        h5: {
            ...rawTheme.typography.h5,
            fontSize: 20,
            fontFamily: 'JSDongkang-Regular',
            fontWeight: rawTheme.typography.fontWeightLight,
        },
        h6: {
            ...rawTheme.typography.h6,
            ...fontHeader,
            fontSize: 18,
        },
        subtitle1: {
            ...rawTheme.typography.subtitle1,
            fontSize: 18,
        },
        body1: {
            ...rawTheme.typography.body1,
            fontSize: 14,
        },
    },
};

export default responsiveFontSizes(theme);