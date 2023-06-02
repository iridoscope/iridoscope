import {
	shape,
	arrayOf,
	objectOf,
	number,
	string,
	bool,
	object,
	any,
	oneOf,
	oneOfType,
	instanceOf
} from 'prop-types';

const id = number;
const date = instanceOf(Date);