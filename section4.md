# Section 4

## 60. jsx를 꼭 사용하지 않아도 되는 이유

---

JSX 코드를 작성하지 않고 컴파일러로 변환되는 코드를 직접 작성해도 되지만

- 가독성 떨어짐
- 작성할 코드가 많아짐
  이러한 이유등으로 **JSX 코드로 작성하는 것이 좋다.**

```jsx
// jsx
<div id="content">
  <p>Hello, World!</p>
</div>;

// no jsx
React.createElement(
  "div",
  { id: "content" },
  React.createElement("p", null, "Hello, World!")
);
```

### 👉 react-dom & react-native<!-- {"fold":true} -->

- 사용 가능한 컴포넌트가 다름 > HTML 요소 & react-native 컴포넌트
- 이벤트 처리 방식이 다름 > onClick & onPress
- 스타일링 시스템이 다름 > css & stylesheet
- 레이아웃 시스템이 다름 > flexbox 구현 방식의 차이

동일한 리액트 코드라도 실행 환경에 따라 다른 네이티브 코드로 변환되어 실행되는 데 이것은 리액트의 ==“_Learn once, Write anywhere_”== 철학을 실현하는 방식이다.

## 61. fragments 사용법<!-- {"fold":true} -->

---

[[Fragments]]로 대체

## 62. 컴포넌트를 분리해야 할 때는 언제일까요?<!-- {"fold":true} -->

---

1. 모든 컴포넌트가 **하나의 명확한 역할**을 하도록 만들 때 ==_SRP_== : Single Responsibility Principle
2. 재사용이 필요한 컴포넌트가 있을 때
3. 상태 관리의 복잡성을 줄일 때
4. 성능 최적화가 필요할 때 > 리렌더링이 자주되는 부분이 있다면 별도의 컴포넌트로 분리하여 메모이제이션을 적용할 수 있다.

## 63. feature & state 로 컴포넌트 분리하기<!-- {"fold":true} -->

---

```
.
├── App.jsx
├── assets
│   ├── components.png
│   ├── config.png
│   ├── jsx-ui.png
│   ├── react-core-concepts.png
│   └── state-mgmt.png
├── components
│   ├── CoreConcept.jsx
│   ├── CoreConcepts.jsx
│   ├── Examples.jsx
│   ├── Header
│   │   ├── Header.css
│   │   └── Header.jsx
│   └── TabButton.jsx
├── data.js
├── index.css
└── index.jsx
```

## 64. 문제: 내부 요소에 Props이 전달되지 않을 경우<!-- {"fold":true} -->

---

**커스텀 컴포넌트를 Props로 받는 경우** "_pascal-case_" 로 작성하여 코드의 가독성을 높일 수 있다.

Additional Key Component & Props Concepts

- **Forwarded Props** : 받은 props를 하위 컴포넌트로 전달하는 패턴
- **Multiple Component Slots** : 여러 개의 슬롯을 정의하여 다양한 컨텐츠를 받을 수 있게 하는 패턴
- **Element Identifier as Props** : HTML요소(id, classNAme •••)의 속성을 props로 전달받아 동적으로 설정하는 패턴
- **Default Prop Values** : props가 전달되지 않을 때 사용할 기본값을 설정하는 패턴

👉 **패턴들을 모두 활용한 고급 컴포넌트**

```jsx
function Modal({
  id = "default-modal", // Default Prop Values
  className, // Element Identifier
  header, // Multiple Component Slots
  children, // Multiple Component Slots
  footer, // Multiple Component Slots
  ...restProps // Forwarded Props
}) {
  return (
    <div
      id={id}
      className={`modal ${className}`}
      {...restProps}>
      {header && <div className="modal-header">{header}</div>}
      <div className="modal-content">{children}</div>
      {footer && <div className="modal-footer">{footer}</div>}
    </div>
  );
}
```

camel-case

- 첫 글자 소문자로 시작
- 변수나 함수 네이밍
  pascal-case
- 첫 글자 대문자로 시작
- 클래스나 타입 & 컴포넌트 함수 네이밍

## 65. 감싸진 요소에 props 전달하기<!-- {"fold":true} -->

---

👉 **_rest syntax_ & _spread syntax_**

```jsx
// rest syntax
export default function Section({ title, children, ...props }) {
  return (
    // spread syntax
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

- rest-syntax를 통해 하나의 객체에 담고 spread-syntax를 통해 분해하여 그대로 전달
- Wrapper-component를 작성할 때 유용한 패턴

## 66. 여러 JSX 슬롯 활용법<!-- {"fold":true} -->

---

```jsx
export default function Tabs({ buttons, children }) {
  return (
    <>
      <menu>{buttons}</menu>
      {children}
    </>
  );
}
```

- 유연하게 재사용 가능한 컴포넌트 패턴
- 컴포넌트를 분리할 때 사용하는 Props & State 는 전달하면 된다.
  - 다른 탭에서는 적용되지 않은 Props 를 받아야할 수도 있기 때문에 컴포넌트의 재사용 측면에서 문제가 발생한다.
  - 상태 관리를 고려하면 분리하는 것이 그렇게 간단한 작업이 아니게 된다.

```jsx
<Section
  title="Examples"
  id="examples">
  <Tabs
    buttons={
      <>
        <TabButton
          isSelected={selectedTopic === "components"}
          onClick={() => handleSelect("components")}>
          Components
        </TabButton>
        <TabButton
          isSelected={selectedTopic === "jsx"}
          onClick={() => handleSelect("jsx")}>
          JSX
        </TabButton>
        <TabButton
          isSelected={selectedTopic === "props"}
          onClick={() => handleSelect("props")}>
          Props
        </TabButton>
        <TabButton
          isSelected={selectedTopic === "state"}
          onClick={() => handleSelect("state")}>
          State
        </TabButton>
      </>
    }>
    {tabContent}
  </Tabs>
</Section>
```

장점

- **구조적 유연성** : buttons와 children을 완전히 제어할 수 있고 Tabs 컴포넌트를 재사용할 수 있다.
- **관심사의 분리** : 탭의 상태 관리가 Tabls 컴포넌트 외부에서 제어되기 때문에 Tabls 컴포넌트는 레이아웃과 구조에만 집중할 수 있다.
- **투명한 합성** : Fragment를 사용하여 불필요한 DOM노드를 추가하지 않으면서 여러 버튼을 그룹화한다.

단점

- **낮은 캡슐화** : 탭 기능의 핵심로직이 Tabls 컴포넌트 외부에 있기 때문에 개발자가 매번 로직을 직접 구현해야 한다. ==_코드의 유연성을 대가로_==
- **불완전한 타입 안정성** : button prop이 단순 ReactNode 타입으로 처리될 가능성이 높아, TabButton 컴포넌트들의 집합이어야 한다는 의도가 타입 시스템에 명확하게 표현되지 않는다.
- **제한된 일관성 보장** : buttons의 구조나 동작 방식을 Tabs 컴포넌트 내부에서 제어하지 않기 때문이다. TabButton 대신 일반 button을 사용하더라도 방지할 수 없다.

👉 **개선된 코드** : 유연성을 어느 정도 유지하면서 더 나은 캡슐화와 타입 안정성을 제공한다.

```jsx
function Tabs({ items, activeId, onSelect, children }) {
  return (
    <>
      <menu>
        {items.map((item) => (
          <TabButton
            key={item.id}
            isSelected={activeId === item.id}
            onClick={() => onSelect(item.id)}>
            {item.label}
          </TabButton>
        ))}
      </menu>
      {children}
    </>
  );
}

// 사용 예시
<Tabs
  items={[
    { id: "components", label: "Components" },
    { id: "jsx", label: "JSX" },
    { id: "props", label: "Props" },
    { id: "state", label: "State" },
  ]}
  activeId={selectedTopic}
  onSelect={handleSelect}>
  {tabContent}
</Tabs>;
```

## 67. 컴포넌트 타입 동적으로 설정하기<!-- {"fold":true} -->

---

wrapper 요소로 사용할 값을 prop으로 받아 사용할 수 있다.

- 커스텀 컴포넌트의 경우 : `wrapper={CustomContainer}`
- 빌트인 컴포넌트의 경우 : `wrapper=“div”`

wrapper를 사용할 때

1. 컴포넌트 함수에서 `const Wrapper = wrapper` 이런 형태로 pascal-case로 작성한 변수를 정의하고 사용해야 한다. 커스텀 컴포넌트를 wrapper로 받을 경우 리액트가 커스텀 컴포넌트로 인지하고 처리하도록 해야 하기 때문이다.
2. 애초에 props를 pascal-case로 작성해도 된다.

이러한 방식은 유연성, 관심사 분리, 재사용성에서는 좋을 수 있지만 복잡도, 타입 안정성, 성능에서 안 좋을 수 있다. (강력한 유연성 / 복잡성)

- 컴포넌트의 레이아웃이나 스타일링이 사용되는 컨텍스트에 따라 크게 달라져야할 때
- 동일한 컴포넌트를 여러 프로젝트나 다양한 환경에서 재사용해야 할 때
- A/B테스트나 테마 시스템을 구현해야 할 때

## 70. 모든 컨텐츠가 컴포넌트에 보관될 필요가 없는 이유<!-- {"fold":true} -->

---

최종적으로 브라우저에서 렌더링되는 것은 `index.html`파일이기 때문에 모든 컨텐츠를 자바스크립트로 작성할 필요 없다.

필요하다면 `index.html`파일에 직접 작성해도 된다.

## 71. 세부 과정: 이미지 저장소는 public vs assets<!-- {"fold":true} -->

---

**public/**

- `index.html`&`index.css`에서 바로 접근 가능
- `localhost:5173/somthing.png` 접근 가능

**src/assets/**

- `src/*`에 있는 파일에서 접근 가능
- `localhost:5173/src/assets/somthing.png` 접근 불가 > 빌드 프로세스에 의해 최적화 과정을 거친 후 `public/` 폴더에 삽입되기 때문에 경로가 바뀐다.

## 75. 컴포넌트 인스턴스의 분리된 동작법<!-- {"fold":true} -->

---

하나의 틀로 여러개의 물건을 찍어내는 것과 동일하다

- 틀 > 컴포넌트 함수
- 물건 > 컴포넌트 함수의 실행으로 생성된 인스턴스 객체

## 77. 옛 state를 기반으로 올바르게 상태 업데이트하기<!-- {"fold":true} -->

---

```jsx
// count: 0
const handleCounterClick = () => {
  setCount(count + 1);
  setCount((count) => count + 1);
  setCount((count) => count + 1);
  setCount(count + 1);
};
```

| queue              | count (0)   |
| ------------------ | ----------- |
| (0 + 1) 1          | 1           |
| count => count + 1 | (1 + 1) = 2 |
| count => count + 1 | (2 + 1) = 3 |
| (0 + 1) 1          | 1           |

- 새로운 count 값은 1 이다.

## 78. 사용자 입력 & 양방향 바인딩<!-- {"fold":true} -->

---

입력에 반응하여 새로운 값으로 업데이트하고 변경된 값을 다시 입력값에 전달하는 방식을 양방향 바인딩이라 한다

## 79. 다차원 리스트 렌더링<!-- {"fold":true} -->

---

JSX값을 요소로 사용하는 배열이 있을 때 각 요소는 `key` prop을 가져야 한다. 이때 index값을 키로 사용하는 것은 옳지 않다. 왜냐하면 index값은 불변값이 아니기 때문에 식별자로 사용하기엔 맞지 않다.

## 80. 불변의 객체 state로 업데이트하기<!-- {"fold":true} -->

---

state값으로 사용하는 객체는 일반 JS객체이기 때문에 내부 값을 수정할 수 있다. 하지만 리액트에서는 "immutable" 처럼 다뤄야 한다.

상태 업데이트를 해야할 때 **새로운 배열을 생성하고** 그 값으로 업데이트를 해야 한다.

```jsx
const handleBoardClick = (rowIndex, colIndex, symbol = "X") => {
  setGameBoard((prev) => {
    const gameBoard = prev.map((arr) => [...arr]);
    gameBoard[rowIndex][colIndex] = symbol;
    return gameBoard;
  });
};
```

👉 **immer 사용**

```jsx
const handleBoardClick = (rowIdx, colIdx, symbol = "X") => {
  setGameBoard(
    produce((draft) => {
      draft[rowIdx][colIdx] = symbol;
    })
  );
};
```

## 81. State 끌어올리기 [핵심 개념]<!-- {"fold":true} -->

---

==“State Lifting”==은 리액트의 상태 관리 패턴 중 하나이다.

**conveats**

- ~prop drilling~ : 컴포넌트 트리가 깊어지면 여러 층의 컴포넌트를 거쳐 전달해야 할 수 있다.
- 복잡성 증가 : 관리해야 할 상태가 많아지면 부모 컴포넌트가 복잡해질 수 있다.

상태 관리 패턴

1. local state
2. state lifting
3. context-based
4. reducer-based
5. custom hook-based
6. libraries > redux, zustlane, jotai, recoil

👉 context-based

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
```

👉 reducer-based

```jsx
const initialState = { count: 0, status: "idle" };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "setStatus":
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

function ComplexCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Status: {state.status}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
    </div>
  );
}
```

👉 custom hook-based

```jsx
function useFormState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(null);
  };

  const validate = () => {
    if (!value) {
      setError("Value is required");
      return false;
    }
    return true;
  };

  return {
    value,
    error,
    handleChange,
    validate,
  };
}
```

👉 libraries

```jsx
import create from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

## 82. 교차 State 방지하기<!-- {"fold":true} -->

---

음.. 먼저 setter 함수의 업데이터 함수에서 useRef 값을 변경하려고 했는데 가급적 피해야하는 방향이라 다르게 하려고 한다.

## 84. Props에서 State 파생하기<!-- {"fold":true} -->

---

상태 변수로 배열 자체를 관리하기 보다는 간단한 데이터를 상태 변수로 관리하고 그걸 이용해서 생성하는 것이 좋다.
