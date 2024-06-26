import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

function Dishes() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null); // State for alert

    useEffect(() => {
        getDishes();
    }, []);

    const onDelete = (dish) => {
        if (!window.confirm("Are you sure you want to delete this dish?")) {
            return;
        }
        axiosClient
            .delete(`/dishes/${dish.id}`)
            .then(() => {
                setAlert("Dish deleted successfully!");
                getDishes(); // Refresh the dishes list
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            })
            .catch((error) => {
                console.error("There was an error deleting the dish:", error);
                setAlert("Failed to delete the dish.");
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            });
    };

    const getDishes = () => {
        setLoading(true);
        axiosClient
            .get("/dishes")
            .then(({ data }) => {
                setLoading(false);
                setDishes(data.data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("There was an error fetching the dishes:", error);
            });
    };

    // Handle the success alert
    const handleSaveSuccess = () => {
        setAlert("Item saved successfully!");
        getDishes();
        setTimeout(() => {
            setAlert(null); // Hide alert after 3 seconds
        }, 3000);
    };

    return (
        <PageComponent title="Dishes">
            {alert && (
                <div className="bg-green-500 text-white p-3 rounded mb-4">
                    {alert}
                </div>
            )}
            <button
                onClick={() => setShowModal(true)}
                className="bg-brand-blue text-white border-2 p-2 rounded-md mb-3"
            >
                Add New
            </button>
            <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Photo
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
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {dishes.map((dish) => (
                                <tr key={dish.id} className="bg-white border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {dish.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {dish.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {dish.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {dish.image && (
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_API_BASE_URL
                                                }/storage/${dish.image}`}
                                                alt={dish.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="bg-brand-blue text-white border-2 p-2 rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(dish)}
                                            className="bg-red-500 text-white border-2 p-2 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                onSave={handleSaveSuccess}
            />
        </PageComponent>
    );
}

export default Dishes;
