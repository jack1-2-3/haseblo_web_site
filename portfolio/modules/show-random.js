class ShowRandom {
    constructor(button, els) {
        this.button = document.querySelector(button); // ボタン要素を取得
        this.els = document.querySelectorAll(els); // ボタンをクリックしたときに表示する要素
        this.list = document.querySelector('.portfolio__list');
        this.items = document.querySelectorAll('.portfolio__item');
        this._eventType = this._getEventType();
        this._init();
    }

    // イベントタイプを取得
    _getEventType() {
        return window.ontouchstart ? 'touchstart' : 'click'; 
    }

    _init() {
        this.button.addEventListener(this._eventType, () => {
            this._randomAppend();
        })
    }

    _randomAppend() {
        // ボタンを２回以上押しても正常に動くように全てのli要素を追加した後一旦すべてのitem要素を削除
        this.items.forEach(item => {
            this.list.appendChild(item);
            this.list.removeChild(item);
        })

        /** 重複チェック用配列 */
        const randoms = [];

        /** 重複チェックしながら乱数作成 */
        for(let i = 0; i < this.els.length; i++){
            while(true){
                const tmp = Math.floor(Math.random() * this.els.length);
                if(!randoms.includes(tmp)){
                    randoms.push(tmp);
                    break;
                }
            }
        }

        // ランダムに抽出したelsをlistに追加
        randoms.forEach(random => {
            this.list.appendChild(this.els[random]);
        })
    }
}

class InitShowRandom extends ShowRandom {
    constructor(button, els) {
        super(button, els);
        this._defaultInit();
    }

    _defaultInit() {
        // ページ読み込み時にelsをランダムに配置
        window.onload = () => {
            super._randomAppend();
        }
    }
}