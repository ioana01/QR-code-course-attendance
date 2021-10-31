import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "./subject.css";

class Subject extends Component {
  render() {
    return (
      <div className="container">
        <div className="container d-flex justify-content-center">
          <div className="row" id="descriptionSubject">
            <div className="col-md-8">
              <div className="row">
                <h3>Informatii generale</h3>
                <div>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap int o electronic typesetting, remaining
                  essentially unchanged. It was popularised in
                </div>
              </div>
              <div className="row">
                <h3>Evaluare pe parcurs</h3>
                <div>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <h3>Orar</h3>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap int o
                electronic typesetting, remaining essentially unchanged. It was
                popularised in
              </div>
            </div>
          </div>
        </div>
        <div class="container buttons-section">
          <div class="row">
            <Button className="col-md" variant="secondary">
              Genereaza cod QR
            </Button>
            <Button className="col-md" variant="secondary">
              Statistici prezenta
            </Button>
            <Button className="col-md" variant="secondary">
              Exporta lista
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Subject;
