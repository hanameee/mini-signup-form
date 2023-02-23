// 1.페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
// 대상: ID input focus
// 시점: 페이지 로드

// 2.ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사를 수행해야 합니다.
const $id = document.getElementById('id')
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')
const $cancleBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')
const $increaseFont = document.getElementById('increase-font-btn')
const $decreaseFont = document.getElementById('decrease-font-btn')

// 핸들러: 유효성 검사
const idRegex = /[a-z0-9-_]{5,20}/
const pwRegex = /[A-Za-z0-9]{8,16}/

let idValue;
let pwValue;
let pwCheckValue;

const validateCommon = (el, msgEl) => {
  el.classList.add('border-red-600')
  msgEl.innerHTML = "필수 정보입니다."
}

const validateId = (e) => {
  if (e.target.value.length === 0) {
    validateCommon($id, $idMsg)
  } else {
    if (idRegex.test(e.target.value)) {
      $id.classList.remove('border-red-600')
      $idMsg.innerHTML.length > 0 && ($idMsg.innerHTML = "")
    } else {
      $idMsg.innerHTML = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
      $id.classList.add('border-red-600')
    }
  }
  $id.classList.contains('border-red-600')
    ? idValue = null
    : idValue = e.target.value
}

const validatePw = (e) => {
  if (e.target.value.length === 0) {
    validateCommon($pw, $pwMsg)
  } else {
    if (pwRegex.test(e.target.value)) {
      $pw.classList.remove('border-red-600')
      $pwMsg.innerHTML.length > 0 && ($pwMsg.innerHTML = "")
    } else {
      $pwMsg.innerHTML = "8~16자 영문 대 소문자, 숫자를 사용하세요."
      $pw.classList.add('border-red-600')
    }
  }
  $pw.classList.contains('border-red-600')
    ? pwValue = null
    : pwValue = e.target.value
}

const validatePwCheck = (e) => {
  if (e.target.value.length === 0) {
    validateCommon($pwCheck, $pwCheckMsg)
  } else {
    if (e.target.value === $pw.value) {
      $pwCheck.classList.remove('border-red-600')
      $pwCheckMsg.innerHTML.length > 0 && ($pwCheckMsg.innerHTML = "")

    } else {
      $pwCheckMsg.innerHTML = "비밀번호가 일치하지 않습니다."
      $pwCheck.classList.add('border-red-600')
    }
  }
  $pwCheck.classList.contains('border-red-600')
    ? pwCheckValue = null
    : pwCheckValue = e.target.value
}


// 이벤트: 각 필드마다 패턴 적용 input focus out / 가입하기
$id.addEventListener('focusout', validateId)
$pw.addEventListener('focusout', validatePw)
$pwCheck.addEventListener('focusout', validatePwCheck)


// 3.커스텀 에러 메세지
// 유형: 공통 / ID / 비밀번호 / 비밀번호 확인

// 4.입력 확인 모달 창
// 이벤트: 제출하기 버튼 클릭 && 모든 input 값이 유효
const onClickRegister = (e) => {
  e.preventDefault()
  if (idValue && pwValue && pwCheckValue) {
    // 핸들러: 아이디와 이벤트 확인 => 모달창
    $modal.show()
    $confirmId.innerHTML = idValue
    $confirmPw.innerHTML = pwValue
  } else {
    return;
  }
}


$submit.addEventListener('click', onClickRegister)
// 취소하기 버튼
$cancleBtn.addEventListener('click', () => $modal.close())
// 가입하기 버튼
$approveBtn.addEventListener('click', () => alert('가입되었습니다 🥳'))


// 5.폰트사이즈 조절

const $html = document.documentElement
const maxFontSize = 20
const minFontSize = 12

const changeFontSize = (status) => {
  let currentFontSize = window.getComputedStyle($html).fontSize
  const nextFontSize = status === 'increase' ? parseInt(currentFontSize) + 1 : parseInt(currentFontSize) - 1
  $html.style.fontSize = `${nextFontSize}px`
  $increaseFont.disabled = nextFontSize >= maxFontSize
  $decreaseFont.disabled = nextFontSize <= minFontSize
}

$increaseFont.addEventListener('click', () => changeFontSize('increase'))
$decreaseFont.addEventListener('click', () => changeFontSize('decrease'))