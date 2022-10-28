import { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/orders', {
        withCredentials: true,
      })
      .then(res => {
        const orders = res.data;
        setOrders(orders);
      })
      .catch(err => {
        console.log(err);
      });
  });

  if (orders.length > 0) {
    const listOrder = orders.map(order => {
      return (
        <div key={order._id}>
          <h3>
            # {order._id}{' '}
            <a href={`http://localhost:5000/orders/${order._id}`}>Invoice</a>
          </h3>
          {order.products.map(p => {
            return (
              <h2 key={p._id}>
                {p.product.title}({p.quantity}) -{' '}
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
};

export default Orders;
