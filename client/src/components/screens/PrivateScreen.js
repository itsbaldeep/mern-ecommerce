import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";

const PrivateScreen = () => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState([]);

    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("petohubAuthToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/api/product", config);
                setPrivateData(data.products);
            } catch (error) {
                localStorage.removeItem("petohubAuthToken");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();
    }, []);
    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <div>
            {privateData.map((product) => (
                <ul>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                    <li>{product.description}</li>
                    <li>{product.createdAt}</li>
                </ul>
            ))}
            <br></br>
        </div>
    );
};

export default PrivateScreen;
