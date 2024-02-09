import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmailVerification = () => {
    const [message, setMessage] = useState("");
    const { token } = useParams();
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify/${token}`);
                const data = await response.json();

                if (response.ok) {
                    setMessage(data.message);
                } else {
                    setMessage(data.error);
                }
            } catch (error) {
                console.error("Error verifying email:", error);
                setMessage("An error occurred while verifying email.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
};

export default EmailVerification;
