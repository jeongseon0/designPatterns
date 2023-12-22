"use strict";
// 어댑터: 호환되지 않는 인터페이스를 가진 객체들이 협업할 수 있도록 함
// Target: 클라이언트 코드에서 사용하는 도메인별 인터페이스 정의
class Target {
    request() {
        return 'Target: 기본 대상 동작.';
    }
}
// Adaptee: 유용한 동작을 포함하지만 인터페이스가 기존 클라이언트 코드와 호환되지 않음
//          클라이언트 코드에서 사용하기 전에 어댑테이션(적응)이 필요
class Adaptee {
    specificRequest() {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}
// Adapter: Adaptee의 인터페이스를 Target의 인터페이스와 호환되도록 만듦
class Adapter extends Target {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }
    request() {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (번역됨) ${result}`;
    }
}
// 클라이언트 코드: Target 인터페이스를 따르는 모든 클래스를 지원
function adapterClientCode(target) {
    console.log(target.request());
}
console.log('클라이언트: Target 객체로 작동 중입니다:');
const target = new Target();
adapterClientCode(target);
console.log('');
const adaptee = new Adaptee();
console.log('클라이언트: Adaptee 클래스가 알 수 없는 인터페이스를 가졌습니다:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);
console.log('');
console.log('클라이언트: But, Adapter를 통해 사용 가능합니다:');
const adapter = new Adapter(adaptee);
adapterClientCode(adapter);
