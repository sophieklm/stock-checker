# Stock Checker

git remote add origin git@github.com:sophieklm/stock-checker.git
git push -u origin master

Uses a mock stock data api which simulates a delayed and unreliable response.

`https://mock-stock-sophieklm.herokuapp.com/`

#### Usage

Start services in both `frontend` and `backend`, instructions for both in their README.md files.

#### TO DO

- Add sorting by Name, Type, Units Available
- Make list items clickable, and open a modal. Modal contains Name, type, and units available, as well as a description.
- Add pagination.
- Monitor stock levels, send a notification when something goes out of stock. Post request to a webhook in Slack. The payload should be a simple json object which contains `{"text":"Panadol is out of stock"}` with dynamic name. Send the payload with header `Content-type: application/json`
