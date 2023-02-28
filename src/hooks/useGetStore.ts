import { RootState, selectHomeState } from '@/store';
import { useSelector } from 'react-redux';

function useGetRootState() {
  const rootState = useSelector((rootState: RootState) => rootState);
  return rootState;
}

//store 값을 가져오는 함수
export const useGetStore = {
  home: () => selectHomeState(useGetRootState().home),
};
