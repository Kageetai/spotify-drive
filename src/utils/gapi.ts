import gapi from 'gapi';

const apiKey = 'AIzaSyCvnhK4i_hhtxZPPh2XFvA4Ow-ICjsCKjA';
const clientId = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const scopes =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file';

export function initApi() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: apiKey,
      clientId: clientId,
      discoveryDocs: discoveryDocs,
      scope: scopes,
    })
    .then(
      function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // authorizeButton.onclick = handleAuthClick;
        // signoutButton.onclick = handleSignoutClick;
      },
      function(error: Error) {
        console.error(error);
      },
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn: boolean) {
  console.log(isSignedIn);
}

/**
 *  Sign in the user upon button click.
 */
export function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
export function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}
