import React from "react";
import _ from "lodash";

var style = {
  background: "red"
};

var timer = "";

class DropZonePlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
      status: "idle",
      statusMsg: <p>Click or drop files here to upload...</p>,
      style: {}
    };
    this.uploadFile = "";
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.setOriginalText = this.setOriginalText.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.uploadFile) {
      return;
    }
    let data = new FormData();
    data.append("recfile", this.uploadFile);
    data.append("user", "guestUser");

    fetch("/api/uploads/upload/", {
      method: "post",
      body: data
    })
      .then(res => {
        this.setState({
          status: "uploading",
          statusMsg: <p>Uploading...</p>
        });
        return res.json();
      })
      .then(val => {
        if (val.message === "ok") {
          this.setState({
            status: "done",
            statusMsg: (
              <p id="checkMark">
                <i className="fa fa-check" />
              </p>
            )
          });
          this.props.updateImages();
          timer = _.delay(this.setOriginalText, 1000);
        }
      });
    this.uploadFile = "";
    this.setState({
      imagePreviewUrl: ""
    });
  }

  setOriginalText() {
    this.setState({
      status: "idle",
      statusMsg: <p>Click or drop files here to upload...</p>
    });
  }

  handleImageChange(e) {
    e.preventDefault();
    if (timer !== "") {
      clearTimeout(timer);
    }
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        style: { background: "" }
      });
      this.uploadFile = file;
    };

    reader.readAsDataURL(file);
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      style: { background: "#F7ACCF", border: "solid 3px black" }
    });
  }

  onDragLeave(e) {
    e.preventDefault();
    this.setState({
      style: { background: "", border: "dashed" }
    });
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let imagePreview = this.state.statusMsg;
    if (imagePreviewUrl) {
      imagePreview = <img src={imagePreviewUrl} className="dropPreview" />;
    }
    return (
      <div
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        className="dropZoneContainer"
      >
        <div
          className="dropZone"
          id="upload-file-container"
          style={this.state.style}
        >
          {imagePreview}
          <input
            type="file"
            name="file-upload"
            onChange={this.handleImageChange}
          />
        </div>
        <a
          href=""
          onClick={this.handleSubmit}
          className="icon-button cloudicon"
        >
          <i className="fa fa-cloud-upload" />
          <span />
        </a>
      </div>
    );
  }
}

DropZonePlace.propTypes = {
  onDrop: React.PropTypes.func,
  onDragOver: React.PropTypes.func,
  onDragLeave: React.PropTypes.func
};

export default DropZonePlace;
