import React, { Component } from 'react';
import axios from 'axios';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/orders')
      .then(res => {
        const orders = res.data;
        this.setState({ orders });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.orders.length > 0) {
      const listOrder = this.state.orders.map(order => {
        return (
          <div key={order.id}>
            <h1># {order.id}</h1>
            {order.products.map(product => {
              return (
                <h2 key={product.id}>
                  {product.title}({product.orderItem.quantity})
                </h2>
              );
            })}
          </div>
        );
      });

      return (
        <main className='centered'>
          <div>{listOrder}</div>
        </main>
      );
    } else {
      return (
        <div>
          <h2>Nothing there!</h2>
        </div>
      );
    }
  }
}

export default Orders;
