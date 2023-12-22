// 팩토리 : 부모 클래스에서 객체들을 생성할 수 있는 인터페이스를 제공하지만,
//          자식 클래스들이 생성될 객체들의 유형을 변경할 수 있도록 함

// Creator 클래스: Product 클래스의 객체를 반환하는 factory 메서드를 선언
// Creator의 하위 클래스는 일반적으로 아래 메서드의 구현을 제공
abstract class Creator {
    // Creator는 factory 메서드의 기본 구현을 제공함
    public abstract factoryMethod(): Product;

    // Creator의 주요 역할은 제품 생성이 아님
    // factory 메서드에서 반환된 Product 객체에 의존하는 핵심 비즈니스 로직이 포함
    // 하위 클래스는 factory 메서드를 오버라이딩하여 다른 유형의 제품을 반환함으로써 간접적으로 비즈니스 로직을 변경함
    public someOperation(): string {
        // factory 메서드를 호출하여 Product 객체를 생성
        const product = this.factoryMethod();
        // 제품 사용
        return `Creator: 동일한 생성자 코드가 방금 ${product.operation()}를 사용했습니다.`;
    }
}

// Concrete Creators: 결과 제품의 유형을 변경하기 위해 factory 메서드를 오버라이딩
class ConcreteCreator1 extends Creator {
    // 메서드의 특징: 여전히 추상 제품 유형을 사용하지만 실제로는 구체적인 제품이 메서드에서 반환됨
    // 이로 인해 Creator가 구체적인 제품 클래스와 독립적으로 유지될 수 있음
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

// Product 인터페이스: 모든 구체적인 제품이 구현해야 하는 작업을 선언
interface Product {
    operation(): string;
}

// Concrete Products: Product 인터페이스의 다양한 구현을 제공
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{ConcreteProduct1의 결과}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{ConcreteProduct2의 결과}';
    }
}

// 클라이언트 코드는 구체적인 생성자의 인스턴스와 함께 작동하지만 기본 인터페이스를 통함
// 클라이언트가 기본 인터페이스를 통해 계속해서 creator와 작업한다면 어떤 생성자의 하위 클래스를 전달할 수 있음
function factoryMethodClientCode(creator: Creator) {
    // ...
    console.log('클라이언트: 생성자의 클래스를 알지 못하지만 작동합니다.');
    console.log(creator.someOperation());
    // ...
}

// 응용 프로그램은 구성 또는 환경에 따라 생성자의 유형을 선택함
console.log('앱: ConcreteCreator1로 실행됨.');
factoryMethodClientCode(new ConcreteCreator1());
console.log('');

console.log('앱: ConcreteCreator2로 실행됨.');
factoryMethodClientCode(new ConcreteCreator2());
