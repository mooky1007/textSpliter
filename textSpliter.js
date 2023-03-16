class TextSpliter {
    constructor(target, config) {
        this.el = document.querySelector(target);
        this.splitArr = [];
        this.config = config;

        this.init();
    }

    init() {
        if(this.config === undefined) {
            console.error('[필수값 누락] 설정값이 없습니다.');
            return;
        }
        
        this.splitArr = this.el.innerText.split('');
        this.el.innerHTML = '';
        this.splitArr.forEach(word => {
            let span = document.createElement('span');
            span.innerText = word;
            span.style.transition = `${this.config.duration}ms ease-in-out`;
            span.style.position = span.style.position || 'relative';
            for(let startStyle in this.config.start){
                span.style[startStyle] = `${this.config.start[startStyle]}`;
            }
            this.el.appendChild(span);
        });
    }

    async start() {
        this.init()
        clearTimeout(this.timer);
        clearTimeout(this.wordTimer);

        this.timer = setTimeout(async () => {
            let spans = this.el.querySelectorAll('span');
            for(let span of spans) {
                if(span.innerText === ' ') continue;
                await new Promise((resolve, reject) => {
                    this.wordTimer = setTimeout(() => {
                        for(let endStyle in this.config.end){
                            span.style[endStyle] = `${this.config.end[endStyle]}`;
                        }
                        resolve();
                    }, this.config.stepDelay);
                });
            }
            await this.config.callback();
        }, this.config.delay);
    }
}