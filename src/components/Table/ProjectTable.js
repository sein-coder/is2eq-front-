import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {Button, Checkbox, Table, TableHead, TableRow, TableBody, TableCell, Box} from "@material-ui/core";
// core components
import styles from "assets/css/tableStyle.js";
import { blackColor } from "assets/css/react";
import Dialog from "components/content/Dialog/ProjectUpdateDialog.js";
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

  const [open, setOpen] = React.useState(false);

  const handleClose = () => { setOpen(false) };
  const handleOpen = (e) => {
    setProject_idx(e.currentTarget.id);
    setProject_name(e.currentTarget.value.split('-')[0]);
    setProject_usage(e.currentTarget.value.split('-')[1]); 
    setOpen(true)
  };
    
  const [project_name, setProject_name] = React.useState('');
  const [project_usage, setProject_usage] = React.useState('');
  const [project_idx, setProject_idx] = React.useState(0);
  const handleProjectName = e => {setProject_name(e.target.value)};
  const handleProjectUsage = e => {setProject_usage(e.target.value)};

  
  const handleOnChecked = e => {
    if(e.target.checked === true){
      setList(checklist+","+e.target.id);
    }else {
      setList(checklist.replace(','+e.target.id,""));
    }
  }

  const handleOnClick = e => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete("/projects?idxs="+checklist)
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
                {props.map((prop, key) => {
                  if(key !== 1) {
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
                        id={props[1]}
                        value={props[2]+"-"+props[3]}
                        // href={"/home/equipments/"+props[1]}
                        variant="contained"
                        onClick={handleOpen}
                        >수정하기
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

      <Dialog Open = {open} handleClose = {handleClose} 
        project_idx={project_idx} project_name={project_name} project_usage={project_usage}
        handleProjectName={handleProjectName} handleProjectUsage={handleProjectUsage}/>
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
