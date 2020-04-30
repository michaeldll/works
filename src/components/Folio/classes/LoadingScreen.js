import { DefaultLoadingScreen } from '@babylonjs/core/Loading/loadingScreen'

class LoadingScreen {
    constructor() {
        this.init()
    }

    init() {
        DefaultLoadingScreen.prototype.displayLoadingUI = function () {
            if (document.getElementById('customLoadingScreenDiv')) {
                // Do not add a loading screen if there is already one
                document.getElementById(
                    'customLoadingScreenDiv'
                ).style.display = 'flex'
                return
            }
            this._loadingDiv = document.createElement('div')
            this._loadingDiv.id = 'customLoadingScreenDiv'
            this._loadingDiv.innerHTML = `
					<div>Use your mouse to find out all 4 works !</div>
				`
            var customLoadingScreenCss = document.createElement('style')
            customLoadingScreenCss.type = 'text/css'
            customLoadingScreenCss.innerHTML = `
			#customLoadingScreenDiv{
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: black;
				color: white;
				font-size: 40px;
				text-align: center;
				z-index: 2;
                flex-direction: column;
			}
			`
            document
                .getElementsByTagName('head')[0]
                .appendChild(customLoadingScreenCss)
            this._resizeLoadingUI()
            window.addEventListener('resize', this._resizeLoadingUI)
            document.body.appendChild(this._loadingDiv)
        }

        DefaultLoadingScreen.prototype.hideLoadingUI = function () {
            document.getElementById('customLoadingScreenDiv').style.display =
                'none'
        }
    }
}

export default LoadingScreen
