import { types } from '../../types/types';

describe('Tests with types', () => {
	test('should have these types', () => {
		expect(types).toEqual({
			login: '[Auth] Login',
			logout: '[Auth] Logout',

			uiSetError: '[UI] set Error',
			uiRemoveError: '[UI] remove Error',

			uiStartLoading: '[UI] Start loading',
			uiFinishLoading: '[UI] Finish loading',

			notesAddNew: '[Notes] New note',
			notesActive: '[Notes] Set active note',
			notesLoad: '[Notes] Load notes',
			notesUpdated: '[Notes] Update note saved',
			notesFileUrl: '[Notes] Updated image url',
			notesDelete: '[Notes] Delete note',
			notesLogoutCleaning: '[Notes] Logout cleaning',
		});
	});
});
