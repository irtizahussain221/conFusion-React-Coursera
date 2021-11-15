import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
// import DishDetail from "./DishDetailComponent";

class Menu extends React.Component {
  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 mt-5">
          <Card onClick={() => this.props.onClick(dish.id)}>
            <CardImg src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle tag="h5">{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
      </div>
    );
  }
}

export default Menu;
