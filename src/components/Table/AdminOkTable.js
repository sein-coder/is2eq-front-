import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Button, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";
// core components
import styles from "assets/css/tableStyle.js";

import axios from 'axios';

const useStyles = makeStyles(styles);

export default function AdminOkTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor} = props;

  const handleOnClick = e => {
    console.log();
    axios.patch("/admin/ok/"+e.currentTarget.id)
      .then(function(response){
        window.location.reload();
      })
      .catch(function(error){
        console.log(error);
      })
  }

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    <h2>{prop}</h2>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      <h3>{prop}</h3>
                    </TableCell>
                  );
                })}
                <TableCell className={classes.tableCell}>
                    <Button
                        id={prop[0]}
                        style={{backgroundColor:"#9c27b0" }}
                        color="primary"
                        onClick={handleOnClick}
                        variant="contained"
                        >승인하기
                    </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

AdminOkTable.defaultProps = {
  tableHeaderColor: "gray"
};

AdminOkTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
