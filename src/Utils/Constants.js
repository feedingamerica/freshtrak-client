/**
 * Constants defined
 */
export const STATUS_ACTIVE = 1;
export const STATUS_INACTIVE = 0;

export const MESSAGES = {
    SOMETHING_WENT_WRONG: 'Something went wrong'
};

export const STATUS_CODES = {
    HTTP_400: 400,
    HTTP_401: 401,
    HTTP_403: 403,
    HTTP_404: 404,
    HTTP_409: 409,
    HTTP_422: 422,
    HTTP_500: 500,
    HTTP_501: 501,
};

// Set Default Distance to 10 Miles.
export const DEFAULT_DISTANCE = 10;

export const COGNITO_CONFIG = {
	"aws_project_region": "us-west-2",
    //"aws_cognito_identity_pool_id": "us-west-2:6a79038c-f889-4ac8-a444-c7a0dd469cb1",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_jpzZb9bti",
    "aws_user_pools_web_client_id": "1dkh625g08si1sd7t9s2n6fs3j",
    "oauth": {
        "domain": "ftsocialloginfb-dev.auth.us-west-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:3000/",
        "redirectSignOut": "http://localhost:3000/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
}
