import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
  

const OurTable = ({items, classes}) =>(

    <Paper className={classes.root}>
     <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">
                <h1>Items</h1>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {items.map( (item, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
        
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    
    </Paper>


  
);

export default withStyles(styles) (OurTable);