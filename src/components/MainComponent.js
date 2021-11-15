import React from "react";
import Menu from "./menuComponent";
import DishDetail from "./DishDetailComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

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
  }

  render() {
    return (
      <div>
        <Header />
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
        <Footer />
      </div>
    );
  }
}

export default Main;
