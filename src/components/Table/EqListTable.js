import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {Button, Checkbox, Table, TableHead, TableRow, TableBody, TableCell, Box} from "@material-ui/core";
// core components
import styles from "assets/css/tableStyle.js";
import { blackColor } from "assets/css/react";

import axios from 'axios';

const useStyles = makeStyles(styles);

const CustomCheckbox = withStyles({
    root: {
      color: blackColor,
      '&$checked': {
        color: "#9c27b0",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props}/>);



export default function EqListTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor} = props;
  const [checklist, setList] = React.useState('');

  const handleOnChecked = e => {
    if(e.target.checked === true){
      setList(checklist+","+e.target.id);
    }else {
      setList(checklist.replace(','+e.target.id,""));
    }
  }

  const handleOnClick = e => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete("/equipments?idxs="+checklist)
        .then(function(response){

            if(response.data > 0){
              alert("삭제 성공");
              window.location.reload();
            }
        })
        .catch(function(error){
          console.log(error);
        })
    } else {
      return;
    }
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
          {tableData.map((props, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell>
                      <h3>{key+1}</h3>
                  </TableCell>
                {props.map((prop, key) => {
                  if(prop === "미기재" || prop === "미정" || prop === "미확인") {
                    return (
                    <TableCell className={classes.tableCell} key={key}>
                      <h4 style={{color:"red"}}>{prop}</h4>
                    </TableCell>
                    );
                  }
                  else if(key !== 1 && key !== 0) {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        <h3>{prop}</h3>
                      </TableCell>
                    );
                  } 
                })}
                 <TableCell className={classes.tableCell}>
                    <Button
                        style={{backgroundColor:"#9c27b0" }}
                        color="primary"
                        href={"/home/equipments/"+props[1]}
                        variant="contained"
                        >상세보기
                    </Button>
                </TableCell>
                <TableCell className={classes.tableCell}>
                    <CustomCheckbox color="primary" id={props[1]} onChange={handleOnChecked}></CustomCheckbox>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box style={{width:"99%"}} display="flex" flexDirection="row-reverse" p={1} m={1}>
          <Box p={1}>
            <Button style={{backgroundColor:"#9c27b0" }}
            color="primary"
            onClick={handleOnClick}
            variant="contained">삭제하기</Button>
          </Box>
      </Box>
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
