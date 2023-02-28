import { all } from 'redux-saga/effects';
import watchHome from './home';

export default function* rootSaga() {
  try {
    yield all([...watchHome]);
  } catch (error) {
    console.error(error);
  }
}
