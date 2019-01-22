// Theme: Insurance company in which you can create a policy, delete a policy, and create a claim

console.clear();

//Action Creators 

const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  }
}

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  }
}

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  }
}

//Reducers

const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    // we care about this action 
    return [...oldListOfClaims, action.payload]
  }
  // we don't care about the action 
    return oldListOfClaims 
}

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount
  } 
  return bagOfMoney
}

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name]
  } else if (action.type ==="DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name )
  }
  return listOfPolicies
}

// Create store 

const { createStore, combineReducers } = Redux

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
})

const store = createStore(ourDepartments)

// dispatch actions to update the state object (the store)

store.dispatch(createPolicy("Alex", 20))
store.dispatch(createPolicy("Jim", 30))
store.dispatch(createClaim("Alex", 120))
store.dispatch(createClaim("Jim", 10))
store.dispatch(deletePolicy("Alex"))

console.log(store.getState())