import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = '#2D045E';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: '#2EADAB'
        },
        error: {
            main: '#DD0000'
        },
    },
    typography: {
        button: {
            borderRadius: 25
        },
    },
    overrides: {
        MuiTableCell: {
            head: {
                backgroundColor: primaryColor,
                color: '#fff'
            }
        },
        MuiTableSortLabel: {
            root: {
                color: '#fff',
                '&:hover': {
                    color: '#fff'
                },
                '&:active': {
                    color: '#fff'
                },
            },
            active: {
                color: '#fff !important'
            },
            icon: {
                color: '#fff !important'
            }
        },
        MuiFormLabel:{
            root: {
                textTransform: 'uppercase',
                color: '#2D045E'
            }            
        },
        MuiInput:{
            root: {
                "&$error input": {color : '#DD0000'}
            },
            input: {
                color:"#2D045E",    
            },
            underline:{
                '&:after' : {
                    color:"#2D045E"
                }
            }
        }
    }
});