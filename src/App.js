import { Form } from "./Components/Form";
import { Todo } from "./Components/Todo"
function App() {

  return (
    <div className="wrapper">
      <h1 style={{
        color: "white", fontWeight: 700, textAlign: "center",
        marginBottom: "30px"
      }}>TODO</h1>
      <div className="form-and-todo-box">
        {/* <Form /> */}
        <Todo />
      </div>
    </div>
  );
}

export default App;
