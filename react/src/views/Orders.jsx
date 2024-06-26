import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios-client";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrders();
    }, []);

    const onStatus = (order) => {
        if (
            !window.confirm(
                "Are you sure you want to change the status for this order?"
            )
        ) {
            return;
        }
        axiosClient.put(`/orders/${order.id}`).then(() => {
            getOrders();
        });
    };
    const getOrders = () => {
        setLoading(true);
        axiosClient
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setOrders(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    return (
        <PageComponent title="Orders">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                User
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Item
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Total Price
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="bg-white border-b"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.user_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.item_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.total_price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.status === 1 ? (
                                            <button
                                                onClick={(ev) =>
                                                    onStatus(order)
                                                }
                                                className="bg-green-500 text-white border-2 p-2 rounded-md"
                                            >
                                                Deliveried
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(ev) =>
                                                    onStatus(order)
                                                }
                                                className="bg-red-500 text-white border-2 p-2 rounded-md"
                                            >
                                                Canceld
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </PageComponent>
    );
}

export default Orders;
