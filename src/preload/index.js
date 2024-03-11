import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import { apiManufacture } from '../../models/Manufacture';
import { apiCategory } from '../../models/Category';
import { apiType } from '../../models/Type';

const api = {};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('apiManufacture', apiManufacture);
		contextBridge.exposeInMainWorld('apiCategory', apiCategory);
		contextBridge.exposeInMainWorld('apiType', apiType);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	window.electron = electronAPI;
	window.api = api;
}
