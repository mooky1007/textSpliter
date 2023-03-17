class TextSpliter {
    constructor(target, config) {
        this.el = document.querySelectorAll(target)[0];
        this.splitArr = [];
        this.config = config;
        if(document.querySelectorAll(target).length > 1) {
            console.error('[텍스트 애니메이션 오류] 타겟클래스가 2개 이상입니다.');
            return;
        }

        if(this.el.innerText === '') {
            console.error('[텍스트 애니메이션 오류] 타겟클래스에 텍스트가 없습니다.');
            return;
        }
        
        const {
            stepDelay,
            duration,
            delay,
            callback,
        } = this.config;

        this.stepDelay = stepDelay || 50;
        this.duration = duration || 100;
        this.delay = delay || 0;
        this.callback = callback || function() {};

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
            span.style.transition = `${this.duration}ms ease-in-out`;
            span.style.position = span.style.position || 'relative';
            span.style.display = `inline-block`;
            if(span.innerText === ' '){
                span.style.width = '1ch';
            }
            for(let startStyle in this.config.start){
                span.style[startStyle] = `${this.config.start[startStyle]}`;
            }
            this.el.appendChild(span);
        });
    }

    beforeStart() {
        this.el.querySelectorAll('span').forEach(word => {
            word.style.transition = `none`;
            for(let startStyle in this.config.start){
                word.style[startStyle] = `${this.config.start[startStyle]}`;
            }
            setTimeout(() => {
                word.style.transition = `${this.duration}ms ease-in-out`;
            }, 0);
        });
    }

    async start() {
        this.beforeStart();
        clearTimeout(this.timer);
        clearTimeout(this.wordTimer);

        this.timer = setTimeout(async () => {
            let spans = this.el.querySelectorAll('span');
            for(let span of spans) {
                if(span.innerText === ' '){ continue };
                await new Promise((resolve, reject) => {
                    this.wordTimer = setTimeout(() => {
                        for(let endStyle in this.config.end){
                            span.style[endStyle] = `${this.config.end[endStyle]}`;
                        }
                        resolve();
                    }, this.stepDelay);
                });
            }
            await this.callback();
        }, this.delay);
    }
}