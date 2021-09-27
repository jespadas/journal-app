export const fileUpload = async (file) => {
	// Backend storage server url
	const cloudUrl = 'https://api.cloudinary.com/v1_1/jespadas/upload';

	// Creates the form data to use POST method
	const formData = new FormData();

	// Form Data body
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	// Try to POST the Form Data
	try {
		// methot POST with fetch
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});

		// If everything is ok we can return the image url from Cloudinary
		if (resp.ok) {
			const cloudResp = await resp.json();
			return cloudResp.secure_url;
		} else {
			return null; // <== changed for the test
		}
		// Catch the Error and show the message
	} catch (err) {
		throw err;
	}
};
