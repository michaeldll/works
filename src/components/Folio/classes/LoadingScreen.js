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
            if (window.innerWidth < 450) {
                this._loadingDiv.innerHTML = `
                    <div class="window loading-text">LOADING</div>
                    <br>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <div id="loading-bar"></div>
                    <br>
                    <div class="window loading-text">Move your phone to explore !</div>
                `
            } else {
                this._loadingDiv.innerHTML = `
                    <div class="window loading-text">LOADING</div>
                    <br>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <div id="loading-bar"></div>
                    <br>
                    <div class="window loading-text">Use your mouse to explore !</div>
                `
            }
            var customLoadingScreenCss = document.createElement('style')
            customLoadingScreenCss.type = 'text/css'
            customLoadingScreenCss.innerHTML = `
			      #customLoadingScreenDiv{
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: black;
              text-align: center;
              z-index: 2;
              flex-direction: column;                
            }
            .loading-text {
                color: #f9d586;
                box-shadow: none;
                background: none;
                padding: 0;
                font-size: 40px;
            }    
            @media screen and (max-width: 450px){
                .discover {
                  width: 25%;
                }
                .subtitle{
                  padding: 10px 50px;
                }
            }            
            .lds-ellipsis {
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
              }
              .lds-ellipsis div {
                position: absolute;
                top: 33px;
                width: 10px;
                height: 10px;
                background: #f9d586;
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
              }
              .lds-ellipsis div:nth-child(1) {
                left: 8px;
                animation: lds-ellipsis1 0.6s infinite;
              }
              .lds-ellipsis div:nth-child(2) {
                left: 8px;
                animation: lds-ellipsis2 0.6s infinite;
              }
              .lds-ellipsis div:nth-child(3) {
                left: 32px;
                animation: lds-ellipsis2 0.6s infinite;
              }
              .lds-ellipsis div:nth-child(4) {
                left: 56px;
                animation: lds-ellipsis3 0.6s infinite;
              }
              @keyframes lds-ellipsis1 {
                0% {
                  transform: scale(0);
                }
                100% {
                  transform: scale(1);
                }
              }
              @keyframes lds-ellipsis3 {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(0);
                }
              }
              @keyframes lds-ellipsis2 {
                0% {
                  transform: translate(0, 0);
                }
                100% {
                  transform: translate(24px, 0);
                }
              }     
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
