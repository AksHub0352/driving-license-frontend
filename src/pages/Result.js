import React, { useState, useEffect } from "react";
import License from "./License";
import { useNavigate } from "react-router-dom";

const Result = ({ selectedAnswers }) => {
    const [showLicense, setShowLicense] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [resultData, setResultData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTryAgainClick = () => {
        navigate('/testinstruction');
    }

    const handleViewDLClick = () => {
        setShowLicense(true);
        setShowModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/result`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')

                    },
                    body: JSON.stringify({ selectedAnswers })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch result');
                }

                const data = await response.json();
                setResultData(data);
            } catch (error) {
                console.error('Error fetching result:', error);
                setError('Failed to fetch result');
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [selectedAnswers]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!resultData) {
        return null;
    }

    const { totalPoints, passOrFail, passThreshold, answeredQuestions, loginId } = resultData.message;

    return (
        <div style={{ textAlign: "center", backgroundColor: "#f7f7f7", padding: "20px" }}>
            <button onClick={handleLogout} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
            <h2 style={{ color: "#333" }}>Quiz Result</h2>
            <table style={{ margin: "auto", borderCollapse: "collapse", border: "2px solid #333", backgroundColor: "#fff" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #333", padding: "8px", backgroundColor: "#f0f0f0" }}>Login Id</th>
                        <th style={{ border: "1px solid #333", padding: "8px", backgroundColor: "#f0f0f0" }}>No of Questions Answered</th>
                        <th style={{ border: "1px solid #333", padding: "8px", backgroundColor: "#f0f0f0" }}>No of Unanswered Questions</th>
                        <th style={{ border: "1px solid #333", padding: "8px", backgroundColor: "#f0f0f0" }}>Total Points Earned</th>
                        <th style={{ border: "1px solid #333", padding: "8px", backgroundColor: "#f0f0f0" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid #333", padding: "8px" }}>{loginId}</td>
                        <td style={{ border: "1px solid #333", padding: "8px" }}>{answeredQuestions}</td>
                        <td style={{ border: "1px solid #333", padding: "8px" }}>{10 - answeredQuestions}</td>
                        <td style={{ border: "1px solid #333", padding: "8px" }}>{totalPoints}</td>
                        <td style={{ border: "1px solid #333", padding: "8px" }}>{passOrFail}</td>
                    </tr>
                </tbody>
            </table>
            <div style={{ marginTop: "20px" }}>
                {/* Conditionally render the "View DL" or "Try Again" button */}
                {passOrFail === "Pass" ? (
                    <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }} onClick={handleViewDLClick}>View DL</button>
                ) : (
                    <button style={{ backgroundColor: "#f44336", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }} onClick={handleTryAgainClick}>Try Again</button>
                )}

                {/* Modal to display the license data */}
                {showModal && (
                    <div className="modal" style={{ position: "fixed", zIndex: "1", left: "0", top: "0", width: "100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.4)" }}>
                        <div className="modal-content" style={{ backgroundColor: "#90f1dc", margin: "15% auto", padding: "20px", border: "1px solid #333", width: "80%", position: "relative" }}>
                            <span className="close" style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }} onClick={() => setShowModal(false)}>&times;</span>
                            <License userName={loginId} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Result;
