import { getAuth } from 'firebase-admin/auth';

const FirebaseAuthFunctions = {
    /**
	 * Initiates a simple call
	 * param destinationId string - The destination uuid of the callee
	 * return null
	 */
    getUserById: (uid) => {
        getAuth()
        .getUser(uid)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
    }

}

export {FirebaseAuthFunctions};