import axiosClient from "../axios-client";
import { useRef, useState } from "react";

const Modal = ({ showModal, setShowModal, onSave }) => {
    if (!showModal) return null;

    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("price", priceRef.current.value);
        if (imageRef.current.files[0]) {
            formData.append("image", imageRef.current.files[0]);
        }

        setErrors(null);

        axiosClient
            .post("/dishes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                onSave(); // Call the success handler
                setShowModal(false);
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/2 relative">
                <h2 className="text-2xl mb-4">Add a Dish</h2>
                <main>
                    <div className="mx-auto max-w-xl py-6 sm:px-6 lg:px-8">
                        {errors && (
                            <div className="bg-red-500 text-white p-3 rounded-md my-3">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={nameRef}
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        ref={descriptionRef}
                                        id="description"
                                        name="description"
                                        type="text"
                                        autoComplete="description"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={priceRef}
                                        id="price"
                                        name="price"
                                        type="number"
                                        autoComplete="price"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={imageRef}
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-brand-hover-blue"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Modal;
