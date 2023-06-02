import Application from './pages/Application.js'
import ChoosePhoto from './pages/ChoosePhoto.js'
import NotFound from './pages/NotFound.js'
import Offline from './pages/Offline.js'
import GenericError from './pages/Error.js'

export default [{
	path: '/',
	Component: Application,
	children: [
		{ Component: ChoosePhoto },
		{ path: 'error', status: 500, Component: GenericError },
		{ path: 'offline', status: 503, Component: Offline },
		{ path: 'not-found', status: 404, Component: NotFound },
		{ path: '*', status: 404, Component: NotFound }
	]
}]