import { TableContainer, Table, TableRow, TableBody, TableCell, Paper, TableHead, TablePagination, makeStyles, withStyles } from "@material-ui/core";
import { useState } from "react";


const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            maxHeight: 250,
        },
        [theme.breakpoints.up('md')]: {
            maxHeight: 350,
        },
        [theme.breakpoints.up('lg')]: {
            maxHeight: 440,
        },
        [theme.breakpoints.up('xl')]: {
            maxHeight: 800,
        },
    },
}));


const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#00234B',
      color: theme.palette.common.white,
      fontSize: theme.typography.subtitle1,
    },
}))(TableCell);
  


export default function SectionTable(props) {
    const classes = useStyle();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { pre, values } = props;
    const keys = pre.filter(
        item => item !== 'studentNum' && item !== 'point' && item !== 'result' 
        && item !== 'gradingDate' && item !== 'itoken' && item !== 'instructor' && item !== 'className');


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        console.log(parseInt(event.target.value, 10))
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, values.length - page * rowsPerPage);

    return (
        <Paper className={classes.root}>
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell key="stn" align="right">
                                Student Number
                            </StyledTableCell>
                            <StyledTableCell key="total" align="right">
                                Total Score
                            </StyledTableCell>
                            <StyledTableCell key="res" align="right">
                                Student Score
                            </StyledTableCell>
                            <StyledTableCell key="time" align="right">
                                Grading Timestamp
                            </StyledTableCell>
                            <StyledTableCell key="cname" align="right">
                                Class name
                            </StyledTableCell>
                            {keys.map((row, index) => (
                                <StyledTableCell key={index} align="right">{row}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            <StyledTableRow key={index + `v`}>
                                <TableCell key={index + `stn`} align="right">
                                    {row['studentNum']}
                                </TableCell>
                                <TableCell key={index + `total`} align="right">
                                    {row.point}
                                </TableCell>
                                <TableCell key={index + `res`} align="right">
                                    {row.result}
                                </TableCell>
                                <TableCell key={index + `time`} align="right">
                                    {row.gradingDate}
                                </TableCell>
                                <TableCell key={index + `cname`} align="right">
                                    {row.className}
                                </TableCell>
                                {keys.map((detail, idx) => (
                                    <TableCell key={idx + 'each'} align="right">
                                        {row[detail].deductedPoint}
                                    </TableCell>
                                ))}
                                
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows}}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={values.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}