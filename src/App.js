import React, { Component } from "react";
import Column from "./components/Column/Column";
import classes from "./App.module.css";
import Advertising from "./components/Advertising/Advertising";

const base_url = "http://10.215.16.247:8051/api/";

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (!getCookie("token_key")) {
  fetch(base_url + "login/2050", {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      document.cookie = "token_key=" + result + "; max-age=31536000";
    });
  console.log(getCookie("token_key"));
}

const key = getCookie("token_key");

const COOKING = 0;
const COOKED = 5;
const SERVED = 6;

class App extends Component {
  state = {
    orders: [],
  };

  get_orders = (status) => {
    return this.state.orders.filter((order) => {
      return status === "cooking"
        ? order.Items.some((item) => item.ProcessingStatus < COOKED)
        : order.Items.every(
            (item) =>
              item.ProcessingStatus >= COOKED && item.ProcessingStatus < SERVED
          );
    });
  };

  componentDidMount() {
    setInterval(() => {
      fetch(
        base_url +
          "kitchenorders" +
          "?key=" +
          "ded48446-8097-61ed-ce0d-5f586f9796a4",
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result != this.state.orders) {
              this.setState({
                orders: result,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }, 3000);
  }

  render() {
    return (
      <main className={classes.App}>
        <Column
          title="Готовятся"
          status="cooking"
          orders={this.get_orders("cooking")}
        />
        <Column
          title="Готовы"
          status="cooked"
          orders={this.get_orders("cooked")}
        />
        <Advertising />
      </main>
    );
  }
}

export default App;
