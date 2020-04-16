import React from 'react';
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";

import axios from "axios";

export default function FormDialog(props) {

  const {Open, handleClose} = props;
  const [project_name, setProject_name] = React.useState('');
  const [project_usage, setProject_usage] = React.useState('');
  
  const handleProjectName = e => {setProject_name(e.target.value)};
  const handleProjectUsage = e => {setProject_usage(e.target.value)};

  const handleOnClick = e => {
    axios.post('/projects/', {
        "project_name" : {project_name}.project_name,
        "project_usage" : {project_usage}.project_usage
    }).then(response => {
      if(response.data > 0) {
        alert("등록 성공");
        window.location.reload();
      }else {
        alert("등록 실패1");
      }
    }).catch(error => {
      alert("등록 실패2");
    });
  }

  return (
    <div>
      <Dialog open={Open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">프로젝트 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            추가하실 프로젝트 명과 용도를 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="project_name"
            label="프로젝트 명"
            fullWidth
            required
            onChange={handleProjectName}
          />
          <TextField
            style={{marginTop:"2rem"}}
            margin="dense"
            id="project_usage"
            label="프로젝트 용도"
            fullWidth
            required
            onChange={handleProjectUsage}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{marginLeft: "2rem"}}  onClick={handleOnClick} color="primary">
            추가
          </Button>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
    Open: PropTypes.bool,
    handleClose : PropTypes.func
  };
  