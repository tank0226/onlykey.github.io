window.addEventListener('message', function (event) {
	console.dir(event);
	// if (originWhitelist.includes(event.origin)) {
	if (event.origin) {
		const type = event && event.data && event.data.action;
		msg(`postMessage received: ${type}`);
		return handleMessage({ event, type, connector: new OnlyKeyConnector() });
	}
});

function handleMessage(params = {}) {
	const { event, type, connector } = params;
	if (!(event && type && connector)) {
		throw new ReferenceError(`params event, type, and connector are required.`);
	}

	switch(type) {
		case 'GET_CONNECTOR':
			event.source.postMessage({ data: event.data, connector, type }, event.origin);
			break;
		default:
			// unhandled type
			break;
	}
}

const originWhitelist = [
	'https://'
];

class OnlyKeyConnector {
	constructor(params) {
		this.Sign = auth_sign;
		this.Decrypt = auth_decrypt;
	}
}
