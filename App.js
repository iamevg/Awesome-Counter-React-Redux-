// --------- REDUX START ---------
function createStore(reducer, initialState) {
  let state = initialState;
  let callbacks = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);

    callbacks.forEach(cb => cb());
  };

  const subscribe = callback => {
    callbacks.push(callback);

    return () => callbacks = callbacks.filter(cb => cb !== callback);
  }

  dispatch({});

  return {
    getState,
    subscribe,
    dispatch
  }
}

// --------- REDUX END ---------

// --------- APP START ---------

const initialState = {
  count: 0
};

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + action.amount };
    case "DECREMENT": return { count: state.count - action.amount };
    case "RESET": return { count: 0 };
    default: return state;
  }
}

function increment(amount) {
  return {
    type: "INCREMENT",
    amount
  }
}

function decrement(amount) {
  return {
    type: "DECREMENT",
    amount
  }
}

function reset() {
  return {
    type: "RESET",
  }
}

const store = createStore(reducer, initialState);

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
      store.subscribe(() => this.forceUpdate());
    }

    increment() {
      let amount = parseInt(this.refs.amount.value || 1);

      store.dispatch(increment(amount));
    }

    decrement() {
      let amount = parseInt(this.refs.amount.value || 1);

      store.dispatch(decrement(amount));
    }

    reset() {
      store.dispatch(reset());
    }

    render() {
        const count = store.getState().count;

        return (
            <div className="counter">
                <span className="count">{ count }</span>

                <div className="buttons">
                    <button className="decrement" onClick = { this.decrement }>-</button>
                    <button className="reset" onClick = { this.reset }>сбросить</button>
                    <button className="increment" onClick  = {this.increment }>+</button>
                </div>

                <input type="text" ref="amount" defaultValue="1"/>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('root'));

// --------- APP END ---------