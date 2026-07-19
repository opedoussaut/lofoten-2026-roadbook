# Google Drive synchronization setup

## 1. Open the Google Sheet

Open the spreadsheet used for the roadbook, then choose **Extensions → Apps Script**.

## 2. Add the backend code

Delete the default content of `Code.gs`, then copy the complete contents of:

`apps-script/Code.gs`

Save the project.

## 3. Initialize the roadbook

Return to the spreadsheet and reload it. A menu named **Lofoten Roadbook** appears.

Choose:

1. **Lofoten Roadbook → Initialize sheets**
2. **Lofoten Roadbook → Set access key**

Use a private phrase of at least eight characters. Do not store this phrase in the public GitHub repository.

## 4. Deploy the web app

In Apps Script:

1. Choose **Deploy → New deployment**.
2. Select **Web app**.
3. Description: `Lofoten Roadbook API`.
4. Execute as: **Me**.
5. Who has access: **Anyone**.
6. Click **Deploy** and authorize the script.
7. Copy the URL ending with `/exec`.

## 5. Connect the website

Place the `/exec` URL in `config.js`:

```js
window.LOFOTEN_CONFIG = {
  appsScriptUrl: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec",
  spreadsheetId: "1pNsRj7RHTSS2plAZLNTO4TV-PuzXcz7PK75_uj8HYl4"
};
```

After GitHub Pages redeploys, open the roadbook, click **Connexion Drive**, and enter the same private phrase.

## Security model

The web-app URL is callable publicly because GitHub Pages cannot hold a private server credential. Write and read operations are protected by the private phrase stored in Apps Script Script Properties and only on the user's devices. The phrase must never be committed to GitHub.
