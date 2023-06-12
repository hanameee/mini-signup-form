// TODO: 이 곳에 정답 코드를 작성해주세요.

// 요구사항 1. autofocus
// 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
// HTML의 input 속성에 autoFocus를 삽입하는 방식으로도 구현가능
const $id = document.getElementById('id')

window.addEventListener('load', () => $id.focus())
