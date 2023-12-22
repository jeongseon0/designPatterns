"use strict";
// 중재자: 객체 간의 혼란스러운 의존 관계들을 줄임.
//         객체 간의 직접 통신을 제한하고 중재자 객체를 통해서만 협력하도록 함
// Concrete Mediators: 여러 컴포넌트를 조정하여 협력 동작을 구현
class ConcreteMediator {
    constructor(c1, c2) {
        this.component1 = c1;
        this.component1.setMediator(this);
        this.component2 = c2;
        this.component2.setMediator(this);
    }
    notify(sender, event) {
        if (event === 'A') {
            console.log('Mediator가 A에 반응하고 다음 작업을 트리거합니다:');
            this.component2.doC();
        }
        if (event === 'D') {
            console.log('Mediator가 D에 반응하고 다음 작업을 트리거합니다:');
            this.component1.doB();
            this.component2.doC();
        }
    }
}
// Base Component: 컴포넌트 객체 내부에 중재자의 인스턴스를 저장하는 기본 기능을 제공
class BaseComponent {
    constructor(mediator) {
        this.mediator = mediator;
    }
    setMediator(mediator) {
        this.mediator = mediator;
    }
}
// Concrete Components: 다양한 기능을 구현. 다른 컴포넌트에 의존하지 않음
// + 어떤 구체적인 중재자 클래스에도 의존하지 않음
class Component1 extends BaseComponent {
    doA() {
        console.log('컴포넌트 1이 A를 수행합니다.');
        this.mediator.notify(this, 'A');
    }
    doB() {
        console.log('컴포넌트 1이 B를 수행합니다.');
        this.mediator.notify(this, 'B');
    }
}
class Component2 extends BaseComponent {
    doC() {
        console.log('컴포넌트 2가 C를 수행합니다.');
        this.mediator.notify(this, 'C');
    }
    doD() {
        console.log('컴포넌트 2가 D를 수행합니다.');
        this.mediator.notify(this, 'D');
    }
}
// 클라이언트 코드
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);
console.log('클라이언트가 작업 A를 트리거합니다.');
c1.doA();
console.log('');
console.log('클라이언트가 작업 D를 트리거합니다.');
c2.doD();
