import Button from 'react-bootstrap/Button';
import { gridToRLE } from '../logic/rleLogic';
import { tableToGrid } from '../logic/gridLogic';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react';

/*
    Component for RLE popup modal
*/

class SavedRLEModal extends Component {
  constructor() {
    super();
    this.state = {
      savedRLE: [''],
      showModal: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose = () => {
    // handle closing modal
    this.setState({ showModal: false });
  };

  handleShow = () => {
    // handle rendering modal
    let grid;
    if (this.props.grid.length === 0) {
      // convert table from drawn grid
      grid = tableToGrid(document.querySelector('body > table'));
    } else {
      // get grid from props
      grid = this.props.grid;
    }
    let RLE = gridToRLE(grid, this.props.birthRule, this.props.surviveRule);
    this.setState({ showModal: true, savedRLE: RLE });
  };

  downloadRLEFile = () => {
    // function to download RLE data to an RLE file for user
    let data = this.state.savedRLE.join('\n');
    let filename = 'savedRLE.rle';
    let type = '.rle';
    let file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      let a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  render() {
    // render component
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          View RLE File
        </Button>

        <Modal show={this.state.showModal} size="lg" onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>RLE File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.savedRLE.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.downloadRLEFile}>
              Download RLE File
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SavedRLEModal;
