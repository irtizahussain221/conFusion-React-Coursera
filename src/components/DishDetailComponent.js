import React from "react";
import { Card, CardBody, CardText, CardTitle, CardImg } from "reactstrap";

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg width="100%" top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle tag="h5">{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    if (!comments[0]) {
      return <div></div>;
    } else {
      return comments.map((comment) => {
        let date = new Date(comment.date).toUTCString();
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author}, {date}
            </p>
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 mt-1">
          {this.renderDish(this.props.dish)}
        </div>
        <div className="col-12 col-md-5 mt-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {this.renderComments(this.props.dish.comments)}
          </ul>
        </div>
      </div>
    );
  }
}

export default DishDetail;
