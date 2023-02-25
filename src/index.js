// 2.ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사
const $id = document.getElementById('id')
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

// 핸들러: 유효성 검사 체크
const idRegex = /[a-z0-9-_]{5,20}/
const pwRegex = /[A-Za-z0-9]{8,16}/

const errorMessage = {
  required: "필수 정보입니다.",
  invalidId: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
  invalidPw: "8~16자 영문 대 소문자, 숫자를 사용하세요.",
  invalidPwCheck: "비밀번호가 일치하지 않습니다."
}

const checkErrorMsg = (target) => {
  const { value, id } = target;
  if (value.length === 0) {
    return "required"
  } else {
    switch (id) {
      case "id":
        return idRegex.test(value) ? true : "invalidId";
      case "pw":
        return pwRegex.test(value) ? true : "invalidPw"
      case "pw-check":
        return value === $pw.value ? true : "invalidPwCheck"
    }
  }
}

const checkValidation = (target, msgTarget) => {
  const isValid = checkErrorMsg(target)
  if (isValid !== true) {
    target.classList.add('border-red-600')
    msgTarget.innerHTML = errorMessage[isValid]
  } else {
    target.classList.remove('border-red-600')
    msgTarget.innerHTML = ''
  }
  return isValid
}

// 이벤트: 각 필드마다 패턴 적용 input focus out / 가입하기
$id.addEventListener('focusout', () => checkValidation($id, $idMsg))
$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))
$pwCheck.addEventListener('focusout', () => checkValidation($pwCheck, $pwCheckMsg))

const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')
const $cancleBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')
const $increaseFont = document.getElementById('increase-font-btn')
const $decreaseFont = document.getElementById('decrease-font-btn')

// 4.입력 확인 모달 창
// 이벤트: 제출하기 버튼 클릭 && 모든 input 값이 유효
const onClickRegister = (e) => {
  e.preventDefault()
  const isValidForm =
    (checkValidation($id, $idMsg) === true) &&
    (checkValidation($pw, $pwMsg) === true) &&
    (checkValidation($pwCheck, $pwCheckMsg) === true) && true
  if (isValidForm) {
    // 핸들러: 아이디와 이벤트 확인 => 모달창
    $modal.show()
    $confirmId.innerHTML = $id.value
    $confirmPw.innerHTML = $pw.value
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