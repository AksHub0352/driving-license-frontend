import React, { useState } from "react";

const License = ({ userName }) => {
    const [licenseNumber, setLicenseNumber] = useState(generateLicenseNumber());


    function generateLicenseNumber() {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }

    const handleDownload = () => {

        const licenseData = `
            Temporary Test Driving License\n
            Congratulations, ${userName}! You have passed the assessment.\n
            This is your temporary test driving license.\n
            License Number: ${licenseNumber}
        `;
        const blob = new Blob([licenseData], { type: "text/plain" });


        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "learner_license.txt";
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h2>Temporary Test Driving License</h2>
            <p>Congratulations, {userName}! You have passed the assessment.</p>
            <p>This is your temporary test driving license.</p>

            <p>License Number: {licenseNumber}</p>
            <button onClick={handleDownload}>Download License</button>
        </div>
    );
};

export default License;
