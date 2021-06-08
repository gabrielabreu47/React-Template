import Axios from 'axios';

import * as msal from '@azure/msal-browser';
import { currentUserStorage } from 'localStorage';
import { SuccessNotification } from 'toaster';

var authority = process.env.REACT_APP_AD_AUTHORITY;
var tenantId = process.env.REACT_APP_AD_TENANT_ID;
var scope = process.env.REACT_APP_AD_SCOPE;
authority = authority.replace('{your_tenant_id}', tenantId);

const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AD_CLIENT_ID,
        authority: authority,
        redirectUri: 'https://humanoemisionpolizasfedev.azurewebsites.net/'
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const CallForLoginOrHandleRedirect = async (afterLoginSucceded) => {
    msalInstance.handleRedirectPromise().then((tokenResponse) => {
        if (tokenResponse !== null) {
            Axios.interceptors.request.use(function (request) {
                const token = tokenResponse.accessToken;
                if (token !== null) {
                    request.headers['Authorization'] = `Bearer ${token}`;
                    request.headers.common['Authorization'] = `Bearer ${token}`;
                }
                return request;
            }, function (error) {
                return Promise.reject(error);
            });
            afterLoginSucceded.call(undefined, tokenResponse);
        } else {
            getSilentToken().then(tokenResponse => {
                afterLoginSucceded(tokenResponse);
            });
        }
    }).catch((error) => {
        throw error;
    });
};

function getSilentToken() {
    const userStorage = currentUserStorage.getString();
    let currentUser = userStorage ? JSON.parse(userStorage) : {};
    var currentAccount = msalInstance.getAccountByUsername(currentUser.email);
    var silentRequest = {
        scopes: [scope, 'Mail.Read'],
        account: currentAccount,
        forceRefresh: false,
        redirectUri: window.location.origin
    };
    let promise = msalInstance.acquireTokenSilent(silentRequest)
        .catch((error) => {
            if (error instanceof msal.InteractionRequiredAuthError
                || error.errorCode === 'no_account_error'
                || error.errorCode === 'no_account_in_silent_request') {
                return msalInstance.acquireTokenRedirect(silentRequest);
            } else {
                SuccessNotification('Sesión expirada');
                window.location.href = window.location.origin;
            }
        });
    return promise;
}

export default CallForLoginOrHandleRedirect;
export { getSilentToken, msalInstance };