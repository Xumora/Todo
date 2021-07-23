import './App.css';
import Todo from '../Todo/Todo'

let data = [
  {
    text: "Cras justo odio",
    completed: false,
    dis: false
  },
  {
    text: "Dapibus ac facilisis in",
    completed: true,
    dis: false
  },
  {
    text: "Morbi leo risus",
    completed: false,
    dis: false
  },
]


function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-sm-10 col-md-8 col-lg-6 py-5">
            <Todo tasks={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
