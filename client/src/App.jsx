import { useState , useEffect} from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Forms from './component/Registerform/form.jsx'
import QRCode from './component/qrcode/QrCode.jsx'
import './App.css';

function App() {

	return (
		<div className='app'>
			<h1>Register For QrTicket</h1>
			<div className="app-main">
				<div className="app-left">
					<Forms />
				</div>
				<div className="app-right">
					<QRCode />
				</div>
			</div>
		</div>

	)
}

export default App


