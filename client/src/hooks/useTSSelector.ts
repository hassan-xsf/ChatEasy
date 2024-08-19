import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TStore } from '../store/store';

export const useTSSelector: TypedUseSelectorHook<TStore> = useSelector;

