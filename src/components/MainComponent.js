import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./menuComponent";
import DishDetail from "./DishDetailComponent";
import { DISHES } from "../shared/dishes";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
    this.onDishSelect = this.onDishSelect.bind(this);
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
    console.log(
      this.state.dishes.filter((dish) => {
        return dish.id === this.state.selectedDish;
      })
    );
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} onClick={this.onDishSelect} />
        {this.state.selectedDish !== null ? (
          <DishDetail
            dish={
              this.state.dishes.filter((dish) => {
                return dish.id === this.state.selectedDish;
              })[0]
            }
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Main;
