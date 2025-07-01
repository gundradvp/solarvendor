# Solar Vendors Directory for AP & TG

This React application provides a comprehensive directory of solar vendors operating in Andhra Pradesh and Telangana states in India.

## Features

- **Combined Data Display**: View vendor data from both Andhra Pradesh and Telangana
- **State Filtering**: Filter vendors based on their operating location (AP only, TG only, or both states)
- **District-wise Search**: Find vendors operating in specific districts
- **Statewide Vendor Listing**: View vendors that operate across multiple districts
- **Cross-State Analysis**: Identify vendors that operate in both states
- **Vendor Analytics**: View statistics on vendor distribution across states
- **Detailed Vendor Information**: View comprehensive details about each vendor

## Data Structure

The application uses a combined JSON dataset with the following structure:

```json
{
  "vendorId": 123,
  "vendorName": "Example Solar Company",
  "contactPersonName": "John Doe",
  "contactPersonEmail": "john@example.com",
  "contactPersonMobile": "9123456789",
  "address": "Sample Address, City, State",
  "rating": "4.8",
  "installationCount": 500,
  "consumerRatingCount": 250,
  "installedCapacity": 2500,
  "ap_districts": ["ananthapur", "chittor", "nellore"],
  "tg_districts": ["hyderabad", "rangareddy"],
  "states": ["AP", "TG"],
  "operatesInBothStates": true
}
```

## Project Structure

```
solar-vendors-app/
├── public/
│   ├── all_combined_vendors.json
│   └── ...
├── src/
│   ├── components/
│   │   ├── CrossStateVendors.js
│   │   ├── DistrictList.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── StateFilter.js
│   │   ├── StatewideVendors.js
│   │   ├── VendorAnalytics.js
│   │   └── VendorCard.js
│   ├── pages/
│   │   ├── DistrictPage.js
│   │   ├── HomePage.js
│   │   ├── NotFoundPage.js
│   │   └── VendorDetailPage.js
│   ├── styles/
│   │   └── GlobalStyle.js
│   ├── App.js
│   ├── index.js
│   └── ...
└── package.json
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
