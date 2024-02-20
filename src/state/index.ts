import { atom } from 'recoil';
import {Location} from "../types";

export const locationState = atom<Location | null>({
	key: 'locationState',
	default: null,
});
