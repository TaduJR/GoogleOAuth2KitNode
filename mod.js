import { OAuth2Client } from "google-auth-library";
import readlineSync from "readline-sync";
const authorize = async (credentials, expiryTokenHandler) => {
  try {
    const oauth2Client = new OAuth2Client(
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUris
    );
    if (
      credentials.accessToken &&
      credentials.refreshToken &&
      (await oauth2Client.getTokenInfo(credentials.accessToken)).expiry_date >
        Date.now()
    ) {
      oauth2Client.credentials = {
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
      };
    } else await getNewToken(oauth2Client, credentials);
    oauth2Client.on("tokens", (tokens) => {
      expiryTokenHandler(tokens);
    });
    return oauth2Client;
  } catch (error) {
    throw error;
  }
};

const getNewToken = async (oauth2Client, credentials) => {
  try {
    let authUrl;
    if (credentials.refreshToken)
      authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: credentials.scopes,
      });
    else
      authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: credentials.scopes,
        prompt: "consent",
      });
    console.log("Authorize this app by visiting this url: ", authUrl);
    const code = readlineSync.question("Enter the code from that page here: ");
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens) throw new Error("Error while trying to retrieve access token");
    oauth2Client.credentials = tokens;
  } catch (error) {
    throw error;
  }
};
export default authorize;
