import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
	cloud_name: 'jespadas',
	api_key: '126784253493982',
	api_secret: 'LGN-zOVc-Ci7mZ6RkNshCCx70hs',
	secure: true,
});

describe('Test in fileUpload', () => {
	test('should upload a file an return the url', async (done) => {
		// Fetch the image from url
		const resp = await fetch(
			'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
		);
		// Creates BloB
		const blob = await resp.blob();
		// Creates the file
		const file = new File([blob], 'foto.png');
		// Get the image url
		const url = await fileUpload(file);

		expect(typeof url).toBe('string');

        // Delete img with id

        // Split the url elements
        const segments = url.split('/');
        // Deletes the .png in id
        const imgId = segments[segments.length - 1].replace('.png',"");
		// Deletes the image
        cloudinary.v2.api.delete_resources(imgId, {}, ()=> {
            done();
        });
	});

	test('should return an error', async () => {
		// Creates the file
		const file = new File([], 'foto.png');
		// Get the image url
		const url = await fileUpload(file);

		expect(url).toBe(null);
	});
});
