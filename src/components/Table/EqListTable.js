import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {Button, Checkbox, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";
// core components
import styles from "assets/css/tableStyle.js";
import { blackColor } from "assets/css/react";

const useStyles = makeStyles(styles);

const CustomCheckbox = withStyles({
    root: {
      color: blackColor,
      '&$checked': {
        color: "#9c27b0",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export default function EqListTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
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
                    {prop}
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
                      {prop}
                    </TableCell>
                  );
                })}
                 <TableCell className={classes.tableCell}>
                    <Button
                        style={{backgroundColor:"#9c27b0" }}
                        color="primary"
                        href={"/home/equipments/"+prop[0]}
                        variant="contained"
                        >상세보기
                    </Button>
                </TableCell>
                <TableCell className={classes.tableCell}>
                    <CustomCheckbox color="primary"></CustomCheckbox>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

EqListTable.defaultProps = {
  tableHeaderColor: "gray"
};

EqListTable.propTypes = {
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
