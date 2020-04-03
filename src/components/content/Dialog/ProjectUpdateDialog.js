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

  const {Open, handleClose, project_idx , project_name, project_usage, handleProjectName, handleProjectUsage} = props;

  const handleOnClick = e => {
    axios.patch('/projects/'+project_idx, {
        "project_name" : {project_name}.project_name,
        "project_usage" : {project_usage}.project_usage
    }).then(response => {
      if(response.data > 0) {
        alert("수정 성공");
        window.location.reload();
      }else {
        alert("수정 실패");
      }
    }).catch(error => {
      alert("수정 실패");
    });
  }

  return (
    <div>
      <Dialog open={Open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">프로젝트 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            수정하실 프로젝트 명과 용도를 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="project_name"
            value={project_name}
            label="프로젝트 명"
            fullWidth
            required
            onChange={handleProjectName}
          />
          <TextField
            style={{marginTop:"2rem"}}
            margin="dense"
            id="project_usage"
            value={project_usage}
            label="프로젝트 용도"
            fullWidth
            required
            onChange={handleProjectUsage}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{marginLeft: "2rem"}}  onClick={handleOnClick} color="primary">
            수정
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
    handleClose : PropTypes.func,
    projectData : PropTypes.string,
  };
  