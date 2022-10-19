
interface RealtimeDatabaseConfigInterface {

}

interface RealtimeDatabaseErrorInterface {
	composeError: Function;
	throwError: Function;
	status: number;
	message: string;
	messageDescription: string;
	error: Error
}

export {
	RealtimeDatabaseConfigInterface,
	RealtimeDatabaseErrorInterface
} 