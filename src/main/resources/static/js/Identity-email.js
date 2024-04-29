document.addEventListener('DOMContentLoaded', function() {
    const emailConfirm = document.querySelector('#email-confirm');
    const verifyBtn = emailConfirm.querySelector('.verify_btn');

    const bottomButton = document.querySelector('#bottom-button');
    const nextButton = bottomButton.querySelector('.next-button');

    const emailSend = document.querySelector('#email-send');
    const sendMailBtn = emailSend.querySelector('.send-mail-btn');

    let timer; // 타이머 변수
    let countdownInterval; //카운트 다운 변수

    // =============================인증 기능 구현=============================
    // 인증 확인 버튼 클릭 이벤트 리스너 추가
    verifyBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 동작 중단
        // 이전 타이머 제거
        clearTimeout(timer);
        clearInterval(countdownInterval);

        // 입력된 인증번호 가져오기
        let verificationCode = emailConfirm.querySelector('.verification-code').value;

        // 서버로 인증번호 전송
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/mailCheck?userNumber=' + verificationCode, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        // 인증이 확인되었을 때
                        let verificationResult = emailConfirm.querySelector('.verification-result');
                        verificationResult.textContent = '인증이 확인되었습니다.';
                        verificationResult.style.color = 'green';
                        // sessionStorage.setItem("verification-email","Y");
                        // 다음 버튼 활성화
                        nextButton.classList.remove("disabled");
                    } else {
                        // 인증번호가 일치하지 않을 때
                        let verificationResult = emailConfirm.querySelector('.verification-result');
                        verificationResult.textContent = '인증번호를 다시 한번 확인해주세요.';
                        verificationResult.style.color = 'red';
                        //다음 버튼 비활성화
                        nextButton.classList.add("disabled");
                    }
                } else {
                    alert('서버 오류가 발생했습니다.');
                }
            }
        };
        xhr.send();
    });

    // =============================이메일 발송 구현=============================
    // 이메일 발송 버튼 클릭 이벤트 리스너 추가
    sendMailBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 동작 중단

        //메일 보내기 버튼 눌렀을 때 재발송으로 텍스트 바꿈
        sendMailBtn.textContent = '재발송';
        // 이메일 주소 가져오기
        let email = emailSend.querySelector('input[name="mail"]').value;
        //이메일 주소 유효성 검증
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)) {
            alert("유효한 이메일 형식이 아닙니다.");
        }
        else
        {
            // 서버로 이메일 주소 전송
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/mailSend', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            {
                                //버튼의 비활성 요소 제거
                                verifyBtn.classList.remove("disabled");
                                alert('이메일을 성공적으로 보냈습니다.');

                                //3분 후 버튼이 다시 비활성화 되도록 설정
                                timer = setTimeout(function () {
                                    verifyBtn.classList.add("disabled");
                                }, 180000);
                            }
                            {
                                //버튼 밑에 03:00 시간표시
                                let minutes = 2;
                                let seconds = 59;
                                // 시간을 표시할 요소 선택
                                let countdownElement = emailConfirm.querySelector('.countdown');

                                // 시간 표시 함수 slice를 통해 두자리가 보여짐
                                function displayTime() {
                                    countdownElement.textContent = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
                                }

                                // 1초마다 시간 감소 및 업데이트
                                countdownInterval = setInterval(function () {
                                    // 현재 시간 표시
                                    displayTime();
                                    // 초가 0이면 분을 감소시키고 초를 59로 설정
                                    if (seconds === 0) {
                                        if (minutes === 0) {
                                            clearInterval(countdownInterval);
                                            return;
                                        }
                                        minutes--;
                                        seconds = 59;
                                    } else {
                                        seconds--;
                                    }
                                }, 1000);
                                // 페이지 로드 시 시간 표시
                                displayTime();
                            }
                        } else {
                            alert('이메일 전송에 실패했습니다.');
                        }
                    } else {
                        alert('서버 오류가 발생했습니다.');
                    }
                }
            };
        xhr.send('mail=' + encodeURIComponent(email));
        }
    });
});

