import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import {
  Col,
  Row,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle tag="h5">{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    return (
      <div>
        <Button
          outline
          onClick={() => {
            this.toggleModal();
          }}
        >
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Label htmlFor="rating" className="col-form-label">
                  Rating
                </Label>
                <Col>
                  <Control.select
                    id="rating"
                    name="rating"
                    model=".rating"
                    className="form-control"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => {
                      return <option key={rating}>{rating}</option>;
                    })}
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" className="col-form-label">
                  Your Name
                </Label>
                <Col>
                  <Control.text
                    id="author"
                    name="author"
                    model=".author"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be less than 15 characters",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" className="col-form-label">
                  Comment
                </Label>
                <Col>
                  <Control.textarea
                    model="comment"
                    name="comment"
                    id="comment"
                    model=".comment"
                    className="form-control"
                    rows={6}
                  />
                </Col>
              </Row>
              <Row className="form-group mt-2">
                <Col md={12}>
                  <Button
                    onClick={() => {
                      this.toggleModal();
                    }}
                    type="submit"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (!comments) {
    return <div></div>;
  } else {
    return (
      <ul className="list-unstyled">
        {comments.map((comment) => {
          let date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)));
          return (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>
                -- {comment.author}, {date}
              </p>
            </li>
          );
        })}
        <CommentForm dishId={dishId} addComment={addComment} />
      </ul>
    );
  }
}

class DishDetail extends React.Component {
  render() {
    console.log(this.props);
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.dish) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={this.props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              <RenderComments
                comments={this.props.comments}
                addComment={this.props.addComment}
                dishId={this.props.dish.id}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DishDetail;
