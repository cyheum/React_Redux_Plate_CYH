import 'redux';
import 'react-redux';
import { Task } from 'redux-saga';
import { RootState } from '@/store';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {}
}
