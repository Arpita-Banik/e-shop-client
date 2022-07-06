import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";

const ManageOrders = () => {
  let count = 0;
  const Swal = require("sweetalert2");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [orders]);

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "you will Cancel never back to many",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel order ",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/deleteOrders/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your order cancel successful",
              });
            }
          });
      }
    });
  };

  const handleStatusUpdate = (id) => {
    const status = {
      id: id,
      status: "approved",
    };
    fetch("http://localhost:5000/orderStatusUpdate", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order approved successful",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      });
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-center py-1">
        <h2>Manage All Orders</h2>
      </div>
      {orders.length ? (
        ""
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="info" />
        </div>
      )}
      {orders.length ? (
        <Table responsive striped bordered hover variant="dark">
          {/* table header */}
          <thead>
            <tr className="text-center">
              <th className="fs-6 text-white">Sl</th>
              <th className="fs-6 text-white">UserName</th>
              <th className="fs-6 text-white">Order_ID</th>
              <th className="fs-6 text-white">Amount</th>
              <th className="fs-6 text-white">Payment</th>
              <th className="fs-6 text-white">Status</th>
              <th className="fs-6 text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* looping data */}

            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="fs-6 text-white ">{++count}</td>
                <td className="fs-6 text-white ">{order.email}</td>
                <td className="fs-6 text-white ">{order._id.slice(20, 30)}</td>
                <td className="fs-6 text-white ">${parseFloat(order.order[0].price) * parseFloat(order.order[0].quantity)}</td>
                <td className="fs-6 text-white ">
                  {order.payment ? "Unpaid" : "Paid"}
                </td>
                <td className="fs-6 text-white ">
                  {order.status === "approved" ? (
                    "Approved"
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleStatusUpdate(order._id)}
                    >
                      Approved
                    </Button>
                  )}
                </td>
                <td className="fs-6 text-white ">
                  <Button
                    variant="primary"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        ""
      )}
    </Container>
  );
};

export default ManageOrders;
