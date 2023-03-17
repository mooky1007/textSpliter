# TextSpliter

텍스트 분할 애니메이션 라이브러리  
선택된 DOM의 텍스트를 `<span>`로 분할 후 설정한 animation을 적용합니다.  

## Usage  

1. `<head>` 내에 js 파일을 위치시켜 라이브러리를 불러옵니다.  
```html
 <script src="https://mooky1007.github.io/textSpliter/textSpliter.js"></script>
```  
2. 사용할 DOM에 클래스를 입력해줍니다.  
이때 해당 클래스에는 따로 css를 사용하지 않는걸 권장합니다.  
```html  
 <h1 class="input-your-className">test text please</h1>
```  
3. 해당 dom 하단 혹은 `<body>` 최하단에 `<script>`를 생성해 초기화 후,
`start()` 메서드를 이용해 실행합니다.
```html
    <script>
        const textSpliter = new TextSpliter('.input-your-className', {
            start: {
                bottom: '10px',
                opacity: 0,
            },
            end : {
                bottom: 0,
                opacity: 1,
            },
        });
        textSpliter.start();
    </script>
```
[데모페이지](https://mooky1007.github.io/textSpliter/)
