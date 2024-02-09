import React, { useState } from "react";

const License = ({ userName }) => {
    const [licenseNumber, setLicenseNumber] = useState(generateLicenseNumber());

    // Function to generate a random license number
    function generateLicenseNumber() {
        return Math.random().toString(36).substring(2, 10).toUpperCase(); // Generates an 8-character alphanumeric string
    }

    // Function to handle download of the license document
    const handleDownload = () => {
        // Create a new Blob containing the license information
        const licenseData = `
            Temporary Test Driving License\n
            Congratulations, ${userName}! You have passed the assessment.\n
            This is your temporary test driving license.\n
            License Number: ${licenseNumber}
        `;
        const blob = new Blob([licenseData], { type: "text/plain" });

        // Create a URL for the Blob and initiate download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "temporary_license.txt"; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h2>Temporary Test Driving License</h2>
            <p>Congratulations, {userName}! You have passed the assessment.</p>
            <p>This is your temporary test driving license.</p>
            {/* Display license details */}
            <p>License Number: {licenseNumber}</p> {/* Display the generated license number */}
            {/* Add more details as needed */}
            <button onClick={handleDownload}>Download License</button>
        </div>
    );
};

export default License;
