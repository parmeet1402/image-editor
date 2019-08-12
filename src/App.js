import React, { Component } from "react";
import "./App.css";
//import "antd/dist/antd.css";
//import { Slider, Form } from "antd";

import Slider from "@material-ui/core/Slider";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import AutoFixIcon from "!"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        contrast: "100",
        hue: "0",
        brightness: "100",
        saturation: "100",
        sepia: "0"
      },
      showPanel: false,
      panelContentType: "",
      activeFilter: "normal",
      filters: {
        normal: {
          contrast: "100",
          hue: "0",
          brightness: "100",
          saturation: "100",
          sepia: "0"
        },
        noir: {
          contrast: "138",
          hue: "0",
          brightness: "122",
          saturation: "0",
          sepia: "0"
        },
        aged: {
          contrast: "94",
          hue: "-54",
          brightness: "92",
          saturation: "100",
          sepia: "44"
        },
        whiteout: {
          contrast: "32",
          hue: "0",
          brightness: "173",
          saturation: "0",
          sepia: "0"
        },
        vintage: {
          contrast: "164",
          hue: "0",
          brightness: "47",
          saturation: "0",
          sepia: "100"
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (name, e, value) => {
    this.setState({
      settings: { ...this.state.settings, [name]: value }
    });
  };
  togglePanel = (panelContentType, e) => {
    this.setState({
      showPanel:
        this.state.panelContentType === panelContentType ||
        this.state.panelContentType === "" ||
        (this.state.panelContentType !== panelContentType &&
          !this.state.showPanel)
          ? !this.state.showPanel
          : this.state.showPanel,
      panelContentType
    });
  };
  changeFilter = key => {
    this.setState({
      settings: { ...this.state.filters[key] },
      activeFilter: key
    });
  };
  render() {
    return (
      <div style={{ overflowX: "hidden" }} className="App">
        <div className="image-container">
          <img
            style={{
              filter: `contrast(${this.state.settings.contrast}%) hue-rotate(${
                this.state.settings.hue
              }deg) brightness(${this.state.settings.brightness}%) saturate(${
                this.state.settings.saturation
              }%) sepia(${this.state.settings.sepia}%)`
            }}
            src={`https://unsplash.it/${window.screen.width}/${window.screen
              .height - 56}`}
            alt="Hero Background"
            id="heroImage"
          />
        </div>

        {this.state.showPanel && (
          <div
            id="panel"
            style={{
              height:
                this.state.panelContentType === "styles" ? "150px" : "500px"
            }}
          >
            {this.state.panelContentType === "styles" ? (
              <div className="filter-row">
                {Object.keys(this.state.filters).map(key => (
                  <div
                    key={key}
                    className="filter-item"
                    onClick={() => this.changeFilter(key)}
                  >
                    <img
                      src={`https://unsplash.it/${window.screen.width}/${window
                        .screen.height - 56}`}
                      alt={key}
                      style={{
                        filter: `contrast(${
                          this.state.filters[key]["contrast"]
                        }%) hue-rotate(${
                          this.state.filters[key]["hue"]
                        }deg) brightness(${
                          this.state.filters[key]["brightness"]
                        }%) saturate(${
                          this.state.filters[key]["saturation"]
                        }%) sepia(${this.state.filters[key]["sepia"]}%)`
                      }}
                      className={
                        this.state.activeFilter === key ? "active--image" : ""
                      }
                    />
                    <span
                      className={
                        this.state.activeFilter === key ? "active--text" : ""
                      }
                    >
                      {key}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sliders">
                <div className="slider-group">
                  <h3>Contrast</h3>
                  <Slider
                    value={parseInt(this.state.settings.contrast)}
                    onChange={(e, value) =>
                      this.handleChange("contrast", e, value)
                    }
                    aria-labelledby="continuous-slider"
                    min={50}
                    max={150}
                  />
                </div>
                <div className="slider-group">
                  <h3>Hue</h3>
                  <Slider
                    value={parseInt(this.state.settings["hue"])}
                    onChange={(e, value) => this.handleChange("hue", e, value)}
                    min={-50}
                    max={50}
                  />
                </div>
                <div className="slider-group">
                  <h3>Brightness</h3>
                  <Slider
                    value={parseInt(this.state.settings.brightness)}
                    onChange={(e, value) =>
                      this.handleChange("brightness", e, value)
                    }
                    min={50}
                    max={150}
                  />
                </div>
                <div className="slider-group">
                  <h3>Saturation</h3>
                  <Slider
                    value={parseInt(this.state.settings.saturation)}
                    onChange={(e, value) =>
                      this.handleChange("saturation", e, value)
                    }
                    min={0}
                    max={100}
                  />
                </div>
                <div className="slider-group">
                  <h3>Sepia</h3>
                  <Slider
                    value={parseInt(this.state.settings.sepia)}
                    onChange={(e, value) =>
                      this.handleChange("sepia", e, value)
                    }
                    min={0}
                    max={150}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <BottomNavigation>
          <BottomNavigationAction
            label="Styles"
            value="styles"
            showLabel
            onClick={e => this.togglePanel("styles", e)}
          />

          <BottomNavigationAction
            label="Tune Image"
            value="tuneImage"
            showLabel
            onClick={e => this.togglePanel("tuneImage", e)}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default App;
