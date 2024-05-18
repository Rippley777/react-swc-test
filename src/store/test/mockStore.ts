import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // if you use redux-thunk middleware

const middlewares = [thunk]; // Add other middleware if necessary
const mockStore = configureMockStore(middlewares as any);

// Function to create a new store with initial state
export function createMockStore(initialState: any) {
  return mockStore(initialState);
}
