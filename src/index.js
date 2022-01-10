// 1. 진입 시 input focus 구현
const $id = document.getElementById('id');
window.addEventListener('load', $id.focus());

// 2. 이메일 validation 로직 구현

// 유효하지 않을 경우, 에러 메세지가 나타나야 함
// 2-1. 비어있을 경우: "필수 정보입니다"
// 2-2. 패턴에 맞지 않을 경우: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
const $idMsg = document.getElementById('id-msg');

const ID_INPUT_MESSAGE = {
    invalid: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    required: '필수 정보입니다.',
};

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$');

const isValidId = (value) => {
    if (value.length === 0) {
        return 'required';
    } else {
        return ID_REGEX.test(value) ? true : 'invalid';
    }
};

const checkIdValidation = (value) => {
    const validationResult = isValidId(value);
    if (validationResult === true) {
        $idMsg.innerText = '';
        $id.classList.remove('border-red-600');
    } else {
        $idMsg.innerText = ID_INPUT_MESSAGE[validationResult];
        $id.classList.add('border-red-600');
    }
    return validationResult;
};

$id.addEventListener('focusout', (e) => checkIdValidation(e.target.value));

// 3. 비밀번호 validation 로직 구현

// 유효하지 않을 경우, 아래 에러 메세지가 나타나야 함
// 3-1. 비어있을 경우: "필수 정보입니다"
// 3-2. 패턴에 맞지 않을 경우: "8~16자 영문 대 소문자, 숫자만 사용 가능합니다."
const $pw = document.getElementById('pw');
const $pwMsg = document.getElementById('pw-msg');

const isValidPw = (value) => {
    if (value.length === 0) {
        return 'required';
    } else {
        return PW_REGEX.test(value) ? true : 'invalid';
    }
};

const checkPwValidation = (value) => {
    const validationResult = isValidPw(value);
    if (validationResult === true) {
        $pwMsg.innerText = '';
        $pw.classList.remove('border-red-600');
    } else {
        $pwMsg.innerText = PW_INPUT_MESSAGE[validationResult];
        $pw.classList.add('border-red-600');
    }
    return validationResult;
};

$pw.addEventListener('focusout', (e) => {
    checkPwValidation(e.target.value);
});

const PW_REGEX = new RegExp('^[a-zA-Z0-9W]{8,16}$');

const PW_INPUT_MESSAGE = {
    invalid: '8~16자 영문 대 소문자, 숫자만 사용 가능합니다.',
    required: '필수 정보입니다.',
};

// 4. 비밀번호 확인

// 4-1. 비어있을 경우: "필수 정보입니다"
// 4-2. 비밀번호와 일치하지 않을 경우: "비밀번호가 일치하지 않습니다."
const $pwCheck = document.getElementById('pw-check');
const $pwCheckMsg = document.getElementById('pw-check-msg');

const PW_CHECK_INPUT_MESSAGE = {
    invalid: '비밀번호가 일치하지 않습니다.',
    required: '필수 정보입니다.',
};

const isValidPwCheck = (value) => {
    if (value.length === 0) {
        return 'required';
    } else {
        return value === $pw.value ? true : 'invalid';
    }
};

const checkPwCheckValidation = (value) => {
    const validationResult = isValidPwCheck(value);
    if (validationResult === true) {
        $pwCheckMsg.innerText = '';
        $pwCheck.classList.remove('border-red-600');
    } else {
        $pwCheckMsg.innerText = PW_CHECK_INPUT_MESSAGE[validationResult];
        $pwCheck.classList.add('border-red-600');
    }
    return validationResult;
};

$pwCheck.addEventListener('focusout', (e) => {
    checkPwCheckValidation(e.target.value);
});

// 5. 제출하기 버튼
const $form = document.getElementById('form');
$form.addEventListener('submit', (e) => onSubmit(e));

// 6. 입력 확인 모달
const $submitModal = document.getElementById('submit-modal');
const $modalBackdrop = document.getElementById('modal-backdrop');
const $confirmId = document.getElementById('confirm-id');
const $confirmPw = document.getElementById('confirm-pw');

const $cancelBtn = document.getElementById('cancel-btn');
const $approveBtn = document.getElementById('approve-btn');

const onSubmit = (e) => {
    e.preventDefault();
    const isValidForm =
        checkIdValidation($id.value) === true &&
        checkPwValidation($pw.value) === true &&
        checkPwCheckValidation($pwCheck.value) === true;
    if (isValidForm) {
        $submitModal.hidden = false;
        $modalBackdrop.hidden = false;
        $confirmId.innerText = $id.value;
        $confirmPw.innerText = $pw.value;
    }
};

$cancelBtn.addEventListener('click', () => {
    $submitModal.hidden = true;
    $modalBackdrop.hidden = true;
});

$approveBtn.addEventListener('click', () => window.alert('가입되었습니다 🥳'));

// 7. 폰트 사이즈 조절 기능
const $html = document.documentElement;

const $increaseFontBtn = document.getElementById('increase-font-btn');
$increaseFontBtn.addEventListener('click', () =>
    onClickFontSizeControl('increase')
);

const $decreaseFontBtn = document.getElementById('decrease-font-btn');
$decreaseFontBtn.addEventListener('click', () =>
    onClickFontSizeControl('decrease')
);

const MAX_FONT_SIZE = 20;
const MIN_FONT_SIZE = 12;

const getBodyFontSize = () => {
    const bodyFontSize = window
        .getComputedStyle($html, null)
        .getPropertyValue('font-size');

    return parseFloat(bodyFontSize);
};

const onClickFontSizeControl = (flag) => {
    const fontSize = getBodyFontSize();
    let newFontSize = fontSize;
    if (flag === 'increase' && !$increaseFontBtn.disabled) {
        $html.style.fontSize = fontSize + 1 + 'px';
        newFontSize += 1;
    }
    if (flag === 'decrease' && !$decreaseFontBtn.disabled) {
        $html.style.fontSize = fontSize - 1 + 'px';
        newFontSize -= 1;
    }
    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE;
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE;
};
